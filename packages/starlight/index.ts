import mdx from '@astrojs/mdx';
import type { AstroIntegration, AstroUserConfig } from 'astro';
import { spawn } from 'node:child_process';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { starstruckAsides } from './integrations/asides';
import { starstruckSitemap } from './integrations/sitemap';
import { vitePluginStarstruckUserConfig } from './integrations/virtual-user-config';
import { errorMap } from './utils/error-map';
import { StarstruckConfigSchema, type StarstruckUserConfig } from './utils/user-config';
import { rehypeRtlCodeSupport } from './integrations/code-rtl-support';

export default function StarstruckIntegration(opts: StarstruckUserConfig): AstroIntegration[] {
	const parsedConfig = StarstruckConfigSchema.safeParse(opts, { errorMap });

	if (!parsedConfig.success) {
		throw new Error(
			'Invalid config passed to starstruck integration\n' +
				parsedConfig.error.issues.map((i) => i.message).join('\n')
		);
	}

	const userConfig = parsedConfig.data;

	const Starstruck: AstroIntegration = {
		name: '@awe-player/starstruck',
		hooks: {
			'astro:config:setup': ({ config, injectRoute, updateConfig }) => {
				injectRoute({
					pattern: '404',
					entryPoint: '@awe-player/starstruck/404.astro',
				});
				injectRoute({
					pattern: '[...slug]',
					entryPoint: '@awe-player/starstruck/index.astro',
				});
				const newConfig: AstroUserConfig = {
					vite: {
						plugins: [vitePluginStarstruckUserConfig(userConfig, config)],
					},
					markdown: {
						remarkPlugins: [...starstruckAsides()],
						rehypePlugins: [rehypeRtlCodeSupport()],
						shikiConfig:
							// Configure Shiki theme if the user is using the default github-dark theme.
							config.markdown.shikiConfig.theme !== 'github-dark' ? {} : { theme: 'css-variables' },
					},
					scopedStyleStrategy: 'where',
				};
				updateConfig(newConfig);
			},

			'astro:config:done': ({ config }) => {
				const integrations = config.integrations.map(({ name }) => name);
				for (const builtin of ['@astrojs/mdx', '@astrojs/sitemap']) {
					if (integrations.filter((name) => name === builtin).length > 1) {
						throw new Error(
							`Found more than one instance of ${builtin}.\n` +
								`Starstruck includes ${builtin} by default.\n` +
								'Please remove it from your integrations array in astro.config.mjs'
						);
					}
				}
			},

			'astro:build:done': ({ dir }) => {
				const targetDir = fileURLToPath(dir);
				const cwd = dirname(fileURLToPath(import.meta.url));
				const relativeDir = relative(cwd, targetDir);
				return new Promise<void>((resolve) => {
					spawn('npx', ['-y', 'pagefind', '--site', relativeDir], {
						stdio: 'inherit',
						shell: true,
						cwd,
					}).on('close', () => resolve());
				});
			},
		},
	};

	return [starstruckSitemap(userConfig), Starstruck, mdx()];
}
