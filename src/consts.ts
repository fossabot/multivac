// Legacy exports for backward compatibility.
// Actual config data comes from site.yaml via Astro Content Layer.
// Use getSiteConfig() from utils/config.ts for the full config object.

import { getSiteConfig } from './utils/config';

const config = await getSiteConfig();

export const SITE_TITLE = config.site.title;
export const SITE_DESCRIPTION = config.site.description;
