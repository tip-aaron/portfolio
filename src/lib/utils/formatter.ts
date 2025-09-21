import type { CollectionEntry } from "astro:content";

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
}

export type FormatBlogPostsParam = {
  posts: CollectionEntry<"blog">[];
  options: {
    filterOutDrafts?: boolean;
    filterOutFuturePosts?: boolean;
    sortByDate?: boolean;
    limit?: number;
  };
};

export function formatBlogPosts({ posts, options }: FormatBlogPostsParam) {
  const {
    filterOutDrafts = false,
    filterOutFuturePosts = false,
    sortByDate = true,
    limit,
  } = options;

  const filteredPosts: CollectionEntry<"blog">[] = posts.reduce((acc, post) => {
    const { publishedOn: date, draft } = post.data;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, [] as CollectionEntry<"blog">[]);

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => b.data.publishedOn.getTime() - a.data.publishedOn.getTime()
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
