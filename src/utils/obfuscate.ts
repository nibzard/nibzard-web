// Entity-encodes a string so naive raw-HTML scrapers miss it. Browsers
// decode the entities when rendering, so the text stays human-usable.
export function obfuscate(text: string): string {
  return text.split('').map(char => `&#${char.charCodeAt(0)};`).join('');
}
