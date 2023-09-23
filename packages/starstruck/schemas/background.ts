import { z } from 'astro/zod';

export const BackgroundConfigSchema = () =>
	z
		.union([
			z.object({
				/** Source of the image file to use. */
				src: z.string(),
				/** Alternative text description of the background. */
				alt: z.string().default(''),
				/** Set to `false` to render custom background everywhere.. */
				onlyHome: z.boolean().default(true),
			}),
			z.object({
				/** Source of the image file to use in dark mode. */
				home: z.string(),
				/** Source of the image file to use in light mode. */
				docs: z.string(),
				/** Alternative text description of the background. */
				alt: z.string().default(''),
				/** Set to `false` to render custom background everywhere.. */
				onlyHome: z.boolean().default(true),
			}),
		])
		.optional();

export type BackgroundUserConfig = z.input<ReturnType<typeof BackgroundConfigSchema>>;
export type BackgroundConfig = z.output<ReturnType<typeof BackgroundConfigSchema>>;
