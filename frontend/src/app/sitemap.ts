import { getPages, sendApiRequest } from '@/lib/utilities';
import { WebPage } from '@/types/wp-post-types';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

	const comicPages = await getPages();
	const comicPagesSitemap = comicPages.map( page => ( {
		url: `${ baseUrl }/page/${ page.meta.comic_page_number }`,
		lastModified: page.modified,
		changeFrequency: 'weekly',
		priority: 1
	} ) ) as MetadataRoute.Sitemap;

	const webPages = await sendApiRequest(
		'GET',
		'wp/v2/pages',
		{ _fields: [ 'slug', 'modified' ] }
	) as WebPage[];
	const webPagesSitemap = webPages.map( page => ( {
		url: `${ baseUrl }/${ page.slug }`,
		lastModified: page.modified,
		changeFrequency: 'monthly',
		priority: 0.5
	} ) ) as MetadataRoute.Sitemap;

	return [
		...comicPagesSitemap,
		...webPagesSitemap,
	];
}
 
export function example(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}