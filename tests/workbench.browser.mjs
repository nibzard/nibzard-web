import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { readFileSync } from 'node:fs';

// Run against a local preview. Subscription requests are intercepted; no email is sent.
const origin = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
});
const routes = ['/', '/log', '/projects', '/about', '/bio', '/cv', '/now', '/now/250520', '/thoughts', '/thoughts/260115', '/idea/agent-dash', '/images/250525', '/tags', '/tags/ai', '/search?q=agent', '/claude-glm', '/agentprobe', '/?page=1', '/?page=2', '/styles', '/unsubscribe'];
let count = 0;
try {
  for (const width of [1440, 390]) {
    for (const route of routes) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({ width, height: 950 });
      const response = await page.goto(origin + route, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(response.status(), 200, `${route}: status`);
      const state = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        title: document.querySelector('h1')?.textContent.trim(),
        main: document.querySelector('main')?.getBoundingClientRect().height,
        images: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.getAttribute('src')),
      }));
      assert.ok(state.title, `${route}: missing page title`);
      assert.ok(state.main > 0, `${route}: content hidden`);
      assert.ok(state.scroll <= state.width + 1, `${route}: overflows at ${width}px`);
      assert.deepEqual(state.images, [], `${route}: broken image`);
      assert.deepEqual(errors, [], `${route}: browser errors`);
      await page.close();
      count++;
    }
  }
  for (const route of ['/bio', '/bio/']) {
    const redirect = await fetch(origin + route, { redirect: 'manual' });
    assert.equal(redirect.status, 301, `${route}: must permanently redirect`);
    assert.equal(new URL(redirect.headers.get('location'), origin).pathname, '/about');
  }
  const projectsPage = await browser.newPage();
  const githubRequests = [];
  projectsPage.on('request', request => { if (new URL(request.url()).hostname === 'api.github.com') githubRequests.push(request.url()); });
  const editorial = JSON.parse(readFileSync(new URL('../src/config/projects.json', import.meta.url), 'utf8'));
  const savedProjects = JSON.parse(readFileSync(new URL('../src/data/github-projects.json', import.meta.url), 'utf8'));
  const visibleNames = Object.entries(editorial.repos).filter(([,settings]) => settings.visibility === 'visible').map(([name]) => name);
  await projectsPage.goto(origin + '/projects', { waitUntil: 'networkidle2' });
  const projectLinks = await projectsPage.$$eval('.project-directory h3 a', nodes => nodes.map(node => node.href));
  for (const name of visibleNames) assert.ok(projectLinks.includes('https://github.com/' + name), `Selected project missing: ${name}`);
  assert.equal(projectLinks.length, visibleNames.length);
  const hidden = savedProjects.repositories.find(repo => !editorial.repos[repo.fullName]);
  assert.ok(hidden, 'Snapshot should contain unselected repositories');
  assert.ok(!projectLinks.includes(hidden.url), 'New repositories stay hidden');
  await projectsPage.goto(origin, { waitUntil: 'networkidle2' });
  const homeLinks = await projectsPage.$$eval('.small-project', nodes => nodes.map(node => node.href));
  assert.equal(homeLinks.length, 3);
  for (const link of homeLinks) assert.equal(editorial.repos[link.replace('https://github.com/','')].homepage, true);
  assert.deepEqual(githubRequests, [], 'Visitors must not fetch project metadata from GitHub');
  await projectsPage.close();
  const careerPage = await browser.newPage();
  await careerPage.goto(origin + '/about', { waitUntil: 'networkidle2' });
  assert.equal(await careerPage.$eval('link[rel="canonical"]', node => node.href), 'https://nibzard.com/about');
  assert.equal(await careerPage.$eval('link[rel="author"]', node => node.href), 'https://nibzard.com/about');
  assert.equal(await careerPage.$('a[href="/bio"]'), null);
  await careerPage.focus('.speaker-details summary');
  await careerPage.keyboard.press('Enter');
  assert.equal(await careerPage.$eval('.speaker-details', node => node.open), true);
  const headshot = await careerPage.$eval('.speaker-details a[download]', node => node.href);
  assert.equal((await fetch(headshot)).status, 200);
  await careerPage.goto(origin + '/cv', { waitUntil: 'networkidle2' });
  assert.match(await careerPage.$eval('#experience', node => node.textContent), /Steel/);
  const schemas = await careerPage.$$eval('script[type="application/ld+json"]', nodes => nodes.map(node => JSON.parse(node.textContent)));
  const person = schemas.find(schema => schema['@type'] === 'Person');
  assert.equal(person.worksFor.name, 'Steel');
  assert.equal(person.url, 'https://nibzard.com/about');
  for (const href of await careerPage.$$eval('.career-index a', nodes => nodes.map(node => node.getAttribute('href')))) {
    assert.ok(await careerPage.$(href), `Missing CV section ${href}`);
  }
  await careerPage.evaluate(() => { window.print = () => { window.__printCalled = true; }; });
  await careerPage.click('#print-cv');
  assert.equal(await careerPage.evaluate(() => window.__printCalled), true);
  await careerPage.evaluate(() => document.documentElement.dataset.theme = 'dark');
  await careerPage.emulateMediaType('print');
  assert.equal(await careerPage.$eval('.site-header', node => getComputedStyle(node).display), 'none');
  assert.equal(await careerPage.$eval('body', node => getComputedStyle(node).backgroundColor), 'rgb(255, 255, 255)');
  assert.equal(await careerPage.$eval('html', node => getComputedStyle(node).colorScheme), 'light');
  await careerPage.pdf({ path: '/tmp/nibzard-cv.pdf', format: 'A4', preferCSSPageSize: true, printBackground: true });
  await careerPage.close();
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(origin, { waitUntil: 'networkidle2' });
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  await page.click('.theme-toggle');
  await page.reload({ waitUntil: 'networkidle2' });
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await page.click('.site-nav a[href="/projects"]');
  await page.waitForSelector('.project-directory');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await page.goto(origin + '/search', { waitUntil: 'networkidle2' });
  await page.type('#site-query', 'AgentProbe');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('.search-form button')]);
  assert.ok(await page.$('.search-result a[href="/agentprobe"]'), 'Search must find the project article');
  await page.goto(origin + '/claude-glm', { waitUntil: 'networkidle2' });
  await page.click('.article-utilities summary');
  assert.ok(await page.$('.copy-markdown-button'), 'Markdown action must remain available');
  await page.click('.share-button');
  await page.waitForSelector('.share-popover');
  await page.keyboard.press('Escape');
  await page.waitForSelector('.share-popover', { hidden: true });
  const markdown = await fetch(origin + '/claude-glm', { headers: { Accept: 'text/markdown' } });
  assert.match(markdown.headers.get('content-type'), /text\/markdown/);
  assert.match(await markdown.text(), /GLM-5.3/);
  const raw = await fetch(origin + '/api/raw/claude-glm');
  assert.equal(raw.status, 200);
  const missing = await page.goto(origin + '/not-a-workbench-page', { waitUntil: 'networkidle2' });
  assert.equal(missing.status(), 404);
  assert.match(await page.$eval('h1', node => node.textContent), /Page not found/);
  await page.goto(origin, { waitUntil: 'networkidle2' });
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.url().endsWith('/api/subscribe')) {
      request.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    } else request.continue();
  });
  await page.type('.newsletter-input', 'preview@example.com');
  await page.click('.newsletter-button');
  await page.waitForFunction(() => document.querySelector('#form-message').textContent.includes('Thanks for subscribing'));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  assert.equal(await page.$eval('.row-arrow', node => getComputedStyle(node).transitionDuration), '0s');
  await page.setJavaScriptEnabled(false);
  await page.goto(origin + '/about', { waitUntil: 'domcontentloaded' });
  assert.equal(await page.$eval('main', node => getComputedStyle(node).opacity), '1');
  console.log(`Passed ${count} route/viewport checks, plus project selection and local rendering, permanent Bio redirects, career metadata, speaker assets, CV navigation/printing, keyboard access, theme persistence, search, sharing, Markdown, 404, mocked subscription, reduced motion, and content without JavaScript.`);
} finally {
  await browser.close();
}
