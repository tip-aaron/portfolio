import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedOn: z.string().refine((date) => new Date(date)),
        updatedOn: z.string().refine((date) => new Date(date)).optional(),
        tags: z.array(z.string()),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        draft: z.boolean().optional(),
        relatedPosts: z.array(reference("blog")).optional(),
        author: reference("authors"),
    }),
});

const authors = defineCollection({
    loader: file("src/data/authors.json"),
    schema: z.object({
        name: z.string(),
        description: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        socialLinks: z.array(z.object({
            platform: z.enum(["twitter", "github", "linkedin", "website"]),
            url: z.string().url(),
        })).optional(),
    }),
});

const works = defineCollection({
    loader: file("src/data/works.json"),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdOn: z.string().refine((date) => new Date(date)),
        status: z.enum(["completed", "in-progress", "abandoned"]),
        tags: z.array(z.string()),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        url: z.string().url().optional(),
    }),
});

const certifications = defineCollection({
    loader: file("src/data/certifications.json"),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        receivedOn: z.string().refine((date) => new Date(date)),
        from: z.string(),
        fromUrl: z.string().url(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            width: z.number(),
            height: z.number(),
        }),
    }),
});

export const collections = {
    blog,
    certifications,
    works,
    authors,
};
