import { expect, test } from 'vitest';
import { StarstruckConfigSchema } from '../../utils/user-config';

test('preserve social config order', () => {
	const config = StarstruckConfigSchema.parse({
		title: 'Test',
		social: {
			twitch: 'https://www.twitch.tv/bholmesdev',
			github: 'https://github.com/withastro/starstruck',
			discord: 'https://astro.build/chat',
		},
	});
	expect(Object.keys(config.social || {})).toEqual(['twitch', 'github', 'discord']);
});
