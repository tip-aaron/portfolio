// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://aaronragudos.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime]
	}
});
