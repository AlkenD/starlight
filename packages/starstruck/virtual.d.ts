declare module 'virtual:starstruck/user-config' {
	const Config: import('./types').StarstruckConfig;
	export default Config;
}
declare module 'virtual:starstruck/project-context' {
	export default { root: string };
}

declare module 'virtual:starstruck/user-css' {}

declare module 'virtual:starstruck/user-images' {
	type ImageMetadata = import('astro').ImageMetadata;
	export const logos: {
		dark?: ImageMetadata;
		light?: ImageMetadata;
	};
}
