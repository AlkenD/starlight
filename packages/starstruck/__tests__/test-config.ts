/// <reference types="vitest" />

import { getViteConfig } from 'astro/config';
import type { z } from 'astro/zod';
import { vitePluginStarstruckUserConfig } from '../integrations/virtual-user-config';
import { StarstruckConfigSchema } from '../utils/user-config';

export function defineVitestConfig(config: z.input<typeof StarstruckConfigSchema>) {
	return getViteConfig({
		plugins: [
			vitePluginStarstruckUserConfig(StarstruckConfigSchema.parse(config), {
				root: new URL(import.meta.url),
			}),
		],
	});
}
