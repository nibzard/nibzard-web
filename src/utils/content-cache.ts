// Cache public content on Vercel without enabling storage on downstream CDNs.
export function applyContentCache(request: Request, response: Response, negotiated: boolean): void {
  const contentType = response.headers.get('Content-Type') || '';
  if (!/^(text\/html|text\/markdown)(?:;|$)/i.test(contentType)) return;

  const vary = new Set(
    (response.headers.get('Vary') || '').split(',').map((name) => name.trim().toLowerCase()).filter(Boolean)
  );
  if (negotiated) {
    // All three inputs affect format selection, including browser document requests.
    for (const name of ['accept', 'accept-encoding', 'user-agent', 'sec-fetch-dest']) vary.add(name);
  }
  if (vary.size) response.headers.set('Vary', Array.from(vary).sort().join(', '));

  const restricted = ['Cache-Control', 'CDN-Cache-Control', 'Vercel-CDN-Cache-Control']
    .some((name) => /(?:^|,)\s*(?:private|no-store|no-cache)(?:\s|,|=|$)/i.test(response.headers.get(name) || ''));
  if (
    !['GET', 'HEAD'].includes(request.method) ||
    request.headers.has('Authorization') || request.headers.has('Range') ||
    response.status !== 200 || response.headers.has('Set-Cookie') ||
    restricted || vary.has('*')
  ) {
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
    return;
  }

  // These routes are public and do not personalize content from cookies.
  // Preserve full request-header values in Vary; do not normalize Accept quality values.
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  response.headers.set('CDN-Cache-Control', 'no-store');
  response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=3600');
}
