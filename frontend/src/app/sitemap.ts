import { getPages, sendApiRequest } from '@/lib/utilities';
import { Post, WebPage } from '@/types/wp-post-types';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

	const comicPages = await getPages();
	const comicPagesSitemap = comicPages.map( page => ( {
		url: `${ baseUrl }/page/${ page.meta.comic_page_number }`,
		lastModified: new Date( page.modified ).toISOString(),
		changeFrequency: 'weekly',
		priority: 1
	} ) ) as MetadataRoute.Sitemap;

	const blogPosts = await sendApiRequest(
		'GET',
		'wp/v2/posts'
	) as Post[];
	const blogPostsSitemap = blogPosts.map( post => ( {
		url: `${ baseUrl }/blog/${ post.slug }`,
		lastModified: new Date( post.modified ).toISOString(),
		changeFrequency: 'weekly',
		priority: 0.8
	} ) ) as MetadataRoute.Sitemap;

	const webPages = await sendApiRequest(
		'GET',
		'wp/v2/pages',
		{ _fields: [ 'slug', 'modified' ] }
	) as WebPage[];
	const webPagesSitemap = webPages.map( page => ( {
		url: `${ baseUrl }/${ page.slug }`,
		lastModified: new Date( page.modified ).toISOString(),
		changeFrequency: 'monthly',
		priority: 0.5
	} ) ) as MetadataRoute.Sitemap;

	return [
		...comicPagesSitemap,
		...webPagesSitemap,
		...blogPostsSitemap,
	];
}
