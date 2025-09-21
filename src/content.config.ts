import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "./content/blog/**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      author: z.string(),
      publishedOn: z.date(),
      updatedOn: z.date().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog };
