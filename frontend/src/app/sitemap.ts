import { getBlogPosts, getComicPages, getWebPages } from '@/lib/data-fetching';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

	const comicPages = await getComicPages();
	const comicPagesSitemap = comicPages.map( page => ( {
		url: `${ baseUrl }/page/${ page.meta.comic_page_number }`,
		lastModified: new Date( page.modified ).toISOString(),
		changeFrequency: 'weekly',
		priority: 1
	} ) ) as MetadataRoute.Sitemap;

	const blogPosts = await getBlogPosts();
	const blogPostsSitemap = blogPosts.map( post => ( {
		url: `${ baseUrl }/blog/${ post.slug }`,
		lastModified: new Date( post.modified ).toISOString(),
		changeFrequency: 'weekly',
		priority: 0.8
	} ) ) as MetadataRoute.Sitemap;

	const webPages = await getWebPages();
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
