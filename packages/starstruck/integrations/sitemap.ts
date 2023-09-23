import sitemap, { type SitemapOptions } from '@astrojs/sitemap';
import type { StarstruckConfig } from '../types';

/**
 * A wrapped version of the `@astrojs/sitemap` integration configured based
 * on Starstruck i18n config.
 */
export function starstruckSitemap(opts: StarstruckConfig) {
	const sitemapConfig: SitemapOptions = {};
	if (opts.isMultilingual) {
		sitemapConfig.i18n = {
			defaultLocale: opts.defaultLocale.locale! || 'root',
			locales: Object.fromEntries(
				Object.entries(opts.locales).map(([locale, config]) => [locale, config?.lang!])
			),
		};
	}
	return sitemap(sitemapConfig);
}
