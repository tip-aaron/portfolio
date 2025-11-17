import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context: any) {
  // Fetch collections
  const blogPosts = await getCollection("blog");
  const certifications = await getCollection("certifications");
  const projects = await getCollection("projects");

  // Combine and filter drafts
  const allItems = [...blogPosts, ...certifications, ...projects]
    .filter((item) => !item.data.draft)
    .sort(
      (a, b) => b.data.publishedOn.getTime() - a.data.publishedOn.getTime()
    );

  // Map to RSS format
  const items = await Promise.all(
    allItems.map(async (item) => {
      let url: string;
      let content: string;
      let title: string;

      if ("link" in item.data) {
        title = `${item.collection.toUpperCase()}: ${item.data.title}`;
        url = item.data.link;
        content = `<p>${item.data.description ?? ""}</p><p><a href="${
          item.data.link
        }" target="_blank">Go to link</a></p>`;
      } else {
        title = item.data.title;
        // Blog posts
        content = sanitizeHtml(parser.render(item.body || ""), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        });
        url = `/blogs/${item.id}`;
      }

      return {
        title,
        description: item.data.description ?? "",
        link: url,
        pubDate: item.data.publishedOn,
        author: "Aaron Ragudos",
        content,
      };
    })
  );

  return rss({
    title: "Aaron Ragudos' Portfolio RSS Feed",
    description: "Latest updates on blog, certifications, and projects",
    site: context.site,
    items,
    stylesheet: "/rss/styles.xsl",
  });
}
