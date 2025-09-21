import siteData from "@/data/siteData.json";
import type { CollectionEntry } from "astro:content";

export type JsonLdParams =
  | {
      type: "page";
    }
  | {
      type: "blog";
      post: CollectionEntry<"blog">;
      url: string;
    };

export function generateJsonLd(params: JsonLdParams): string {
  if (params.type === "blog") {
    const post = params.post.data;
    const url = params.url;
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image.src}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
        },
        "datePublished": "${post.publishedOn}"
      }
    </script>`;
  }
  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${siteData.title}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}
