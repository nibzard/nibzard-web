import snapshot from '../data/llm-prices.json';
import { derivePopular } from '../../scripts/lib/llm-prices.mjs';

// The committed snapshot refreshes via `pnpm run prices:sync`; the popular
// subset inlines into the calculator page so it works before the full list
// finishes loading.
export const priceSnapshot = snapshot as unknown as ReturnType<typeof derivePopular>;
export const popularSnapshot = derivePopular(priceSnapshot);
export const pricesFetchedAt = priceSnapshot.fetchedAt;
