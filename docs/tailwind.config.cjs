/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@awe-player/starstruck/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			colors: {},
			typography: {
				DEFAULT: {
					css: {
						color: '#333',
						a: {
							color: '#3182ce',
							'&:hover': {
								color: '#2c5282',
							},
						},
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
