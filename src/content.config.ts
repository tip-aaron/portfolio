import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "src", pattern: "./content/blog/**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      author: z.string(),
      publishedOn: z.date(),
      updatedOn: z.date().optional(),
      draft: z.boolean().optional(),
    }),
});

const certifications = defineCollection({
  loader: glob({ base: "src", pattern: "./content/certifications/**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.optional(z.string()),
      image: z.string(),
      link: z.string().url(),
      publishedOn: z.date(),
      updatedOn: z.date().optional(),
      draft: z.boolean().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "src", pattern: "./content/projects/**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.optional(z.string()),
    image: z.string(),
    link: z.string().url(),
    publishedOn: z.date(),
    updatedOn: z.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog, certifications, projects };
