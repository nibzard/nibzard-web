export function resolveSiteOrigin(site: URL | string | undefined, fallbackUrl: URL): string {
  if (typeof site === 'string') {
    return site;
  }

  if (site instanceof URL) {
    return site.toString();
  }

  return fallbackUrl.origin;
}

export function toSiteUrl(site: URL | string | undefined, fallbackUrl: URL, pathname: string): string {
  return new URL(pathname, resolveSiteOrigin(site, fallbackUrl)).toString();
}
