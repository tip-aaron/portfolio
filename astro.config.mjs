// @ts-check
import { defineConfig } from 'astro/config';

import compress from "astro-compress";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://aaronragudos.website",
  integrations: [sitemap(), compress()],
});