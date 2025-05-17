import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteData from "@data/site_data.json";

const SITE_TITLE = siteData.title;
const SITE_DESCRIPTION = siteData.description;

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			pubDate: post.data.publishedOn,
			title: post.data.title,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
	});
}
