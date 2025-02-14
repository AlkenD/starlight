import type { AstroConfig, ViteUserConfig } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StarstruckConfig } from '../utils/user-config';

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
	return `\0${id}`;
}

/** Vite plugin that exposes Starstruck user config and project context via virtual modules. */
export function vitePluginStarstruckUserConfig(
	opts: StarstruckConfig,
	{ root }: Pick<AstroConfig, 'root'>
): NonNullable<ViteUserConfig['plugins']>[number] {
	const resolveId = (id: string) =>
		JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(root), id) : id);

	/** Map of virtual module names to their code contents as strings. */
	const modules = {
		'virtual:starstruck/user-config': `export default ${JSON.stringify(opts)}`,
		'virtual:starstruck/project-context': `export default ${JSON.stringify({ root })}`,
		'virtual:starstruck/user-css': opts.customCss.map((id) => `import ${resolveId(id)};`).join(''),
		'virtual:starstruck/user-images': opts.logo
			? 'src' in opts.logo
				? `import src from ${resolveId(
						opts.logo.src
				  )}; export const logos = { dark: src, light: src };`
				: `import dark from ${resolveId(opts.logo.dark)}; import light from ${resolveId(
						opts.logo.light
				  )}; export const logos = { dark, light };`
			: 'export const logos = {};',
	} satisfies Record<string, string>;

	/** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	);

	return {
		name: 'vite-plugin-starstruck-user-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id);
		},
		load(id): string | void {
			const resolution = resolutionMap[id];
			if (resolution) return modules[resolution];
		},
	};
}
