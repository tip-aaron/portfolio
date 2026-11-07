// @ts-check
import { defineConfig } from "astro/config";

import compress from "astro-compress";

import sitemap from "@astrojs/sitemap";

import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
  site: "https://tip-aaron.github.io/portfolio",
  integrations: [sitemap(), compress()],
  vite: {
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
  },
});
