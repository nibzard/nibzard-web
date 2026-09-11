const repoPattern = /^[a-z\d-]+\/[a-z\d._-]+$/i;
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const fail = message => { throw new Error(message); };

export function validateConfig(config) {
  if (!isObject(config) || !/^[a-z\d-]+$/i.test(config.owner || '')) fail('Projects config needs a GitHub owner.');
  if (!isObject(config.defaults) || !['hidden', 'visible'].includes(config.defaults.visibility)) fail('Invalid default visibility.');
  if (!isObject(config.repos)) fail('Projects config needs a repos object.');
  if (config.organizations !== undefined && (!Array.isArray(config.organizations) || config.organizations.some(org => typeof org !== 'string' || !/^[a-z\d-]+$/i.test(org)) || new Set(config.organizations.map(org => org.toLowerCase())).size !== config.organizations.length)) fail('Invalid or duplicate organization.');
  const keys = new Set();
  for (const [name, options] of Object.entries(config.repos)) {
    if (!repoPattern.test(name) || keys.has(name.toLowerCase()) || !isObject(options)) fail(`Invalid or duplicate repository: ${name}`);
    keys.add(name.toLowerCase());
    const allowed = ['visibility', 'featured', 'homepage', 'order', 'title', 'description', 'topics', 'article', 'image', 'attribution', 'example'];
    for (const key of Object.keys(options)) if (!allowed.includes(key)) fail(`Unknown project setting: ${name}.${key}`);
    if (options.visibility !== undefined && !['visible', 'hidden'].includes(options.visibility)) fail(`Invalid visibility: ${name}`);
    for (const key of ['featured', 'homepage']) if (options[key] !== undefined && typeof options[key] !== 'boolean') fail(`Invalid ${key}: ${name}`);
    if (options.order !== undefined && !Number.isFinite(options.order)) fail(`Invalid order: ${name}`);
    for (const key of ['title', 'description', 'attribution', 'example']) if (options[key] !== undefined && typeof options[key] !== 'string') fail(`Invalid ${key}: ${name}`);
    if (options.topics !== undefined && (!Array.isArray(options.topics) || options.topics.some(t => typeof t !== 'string'))) fail(`Invalid topics: ${name}`);
    if (options.article !== undefined && !/^\/(?!\/)[^\s]*$/.test(options.article)) fail(`Article must be a local path: ${name}`);
    if (options.image !== undefined) {
      const image = options.image;
      if (!isObject(image) || !/^\/(?!\/)[^\s]*$/.test(image.src) || typeof image.alt !== 'string' || !image.alt.trim() || !Number.isInteger(image.width) || image.width <= 0 || !Number.isInteger(image.height) || image.height <= 0) fail(`Invalid project image: ${name}`);
    }
  }
  return config;
}

export function validateSnapshot(snapshot) {
  if (snapshot?.version !== 1 || !Array.isArray(snapshot.repositories)) fail('Invalid GitHub project snapshot.');
  const names = new Set();
  for (const repo of snapshot.repositories) {
    if (!repoPattern.test(repo.fullName || '') || names.has(repo.fullName.toLowerCase()) || typeof repo.name !== 'string' || repo.url !== `https://github.com/${repo.fullName}` || typeof repo.description !== 'string' || !Array.isArray(repo.topics) || repo.topics.some(t => typeof t !== 'string') || !Number.isFinite(Date.parse(repo.updatedAt)) || !Number.isFinite(Date.parse(repo.pushedAt)) || !(repo.language === null || typeof repo.language === 'string') || typeof repo.archived !== 'boolean' || typeof repo.fork !== 'boolean') fail('Invalid repository in GitHub snapshot.');
    names.add(repo.fullName.toLowerCase());
  }
  return snapshot;
}

export function selectProjects(snapshot, config) {
  validateConfig(config);
  validateSnapshot(snapshot);
  const overrides = new Map(Object.entries(config.repos).map(([name, value]) => [name.toLowerCase(), value]));
  return snapshot.repositories.flatMap(repo => {
    const options = overrides.get(repo.fullName.toLowerCase()) || {};
    if ((options.visibility ?? config.defaults.visibility) !== 'visible') return [];
    return [{ ...repo, title: options.title ?? repo.name, description: options.description ?? repo.description,
      topics: options.topics ?? repo.topics, featured: options.featured ?? false, homepage: options.homepage ?? false,
      order: options.order ?? Number.MAX_SAFE_INTEGER, article: options.article, image: options.image, attribution: options.attribution, example: options.example }];
  }).sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order || Date.parse(b.pushedAt) - Date.parse(a.pushedAt) || a.fullName.localeCompare(b.fullName));
}

// Only these public fields enter the committed snapshot. Never store API responses wholesale.
export function normalizeRepository(repo) {
  if (!isObject(repo) || typeof repo.private !== 'boolean') fail('GitHub returned invalid repository metadata.');
  if (repo.private || (repo.visibility !== undefined && repo.visibility !== 'public') || repo.disabled === true) return null;
  const result = {
    fullName: repo.full_name, name: repo.name, url: `https://github.com/${repo.full_name}`,
    description: repo.description ?? '', topics: [...(repo.topics || [])].sort(), language: repo.language ?? null,
    updatedAt: repo.updated_at, pushedAt: repo.pushed_at || repo.updated_at, archived: repo.archived, fork: repo.fork,
  };
  validateSnapshot({ version: 1, repositories: [result] });
  return result;
}

export async function fetchRepositories(config, { fetchImpl = fetch, token, warn = console.warn } = {}) {
  validateConfig(config);
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'nibzard-project-sync' };
  if (token) headers.Authorization = `Bearer ${token}`;
  async function request(path, allowMissing = false) {
    const response = await fetchImpl(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
    if (allowMissing && response.status === 404) return null;
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for ${path}`);
    return response.json();
  }
  const repositories = new Map();
  const sources = [`/users/${config.owner}/repos?type=owner`, ...(config.organizations || []).map(org => `/orgs/${org}/repos?type=public`)];
  for (const source of sources) {
   for (let page = 1; ; page++) {
    const batch = await request(`${source}&sort=full_name&per_page=100&page=${page}`);
    if (!Array.isArray(batch)) fail('GitHub returned an invalid repository list.');
    for (const raw of batch) {
      const repo = normalizeRepository(raw);
      if (repo) repositories.set(repo.fullName.toLowerCase(), repo);
    }
    if (batch.length < 100) break;
    if (page >= 100) fail('GitHub pagination exceeded the supported limit.');
  }
  }
  // Explicit entries can include organizations or repositories absent from the owner listing.
  for (const name of Object.keys(config.repos)) {
    if (repositories.has(name.toLowerCase())) continue;
    const raw = await request(`/repos/${name}`, true);
    const repo = raw && normalizeRepository(raw);
    if (!repo) { warn(`Project unavailable or not public: ${name}`); continue; }
    // A renamed repository needs an explicit editorial update to avoid publishing it by accident.
    if (repo.fullName.toLowerCase() !== name.toLowerCase()) {
      warn(`Project renamed: update ${name} to ${repo.fullName} in projects.json`);
    }
    repositories.set(repo.fullName.toLowerCase(), repo);
  }
  return validateSnapshot({ version: 1, repositories: [...repositories.values()].sort((a, b) => a.fullName.localeCompare(b.fullName)) });
}
