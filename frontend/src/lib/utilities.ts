import { Character, ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import { cache } from "react";

/**
 * Send a request to the backend API
 */
export async function sendApiRequest(
	method: string,
	endpoint: string,
	urlParams: any = null,
	body: any = null,
	options: any = {},
): Promise<any | void> {
	urlParams = urlParams ? new URLSearchParams( urlParams ) : '';

	options = {
		method,
		...options
	};

	if ( [ 'POST', 'PATCH' ].includes( method ) && body ) {
		options.body = JSON.stringify( body );
	}

	const url = `${ process.env.NEXT_PUBLIC_BACKEND_API_BASE }/${ endpoint }?${ urlParams }`;

	return await fetch( url, options )
		.then( res => res.json() )
		.catch( e => console.error( e ) );
}

/**
 * Returns the latest description up to a certain chapter
 */
export function getLatestDescription(
	chapters: Chapter[],
	currentChapter: string,
	descriptions: Record<string, string>
): string {
	if ( descriptions[ currentChapter ] ) {
		return descriptions[ currentChapter ];
	}
	
	const chapterSlugs = chapters.map( ( c: { slug: string } ) => c.slug );

	let description = null;

	for ( let i = 0; i < chapterSlugs.length; i++ ) {
		const slug = chapterSlugs[i];
		if ( slug === currentChapter ) {
			break;
		}

		if ( descriptions[ slug ] ) {
			description = descriptions[ slug ];
		}
	}

	return description;
}


/**
 * Get the first available description for a character
 */
export function getFirstDescription(
	character: Character
): string {
	return character.content_blocks[0].attrs.descriptions[0] ?? '';
}


/**
 * Sort an array of objects or arrays by one of it's attributes
 */
export function sortByAttribute<T>(
	array: T[],
	attribute: string | number,
	ascending: boolean = true
): T[] {
	const newArray = [ ...array ];
	newArray.sort( ( a, b ) => {
		if ( a?.[ attribute ] < b?.[ attribute ] ){
			return ascending ? -1 : 1;
		}

		if ( a?.[ attribute ] > b?.[ attribute ] ){
			return ascending ? 1 : -1;
		}

		return 0;
	} );

	return newArray;
}

/**
 * Cached fetch for all pages so we're not spamming the back-end for the same content when someone is reading the comic
 */
export const getPages = cache( () => (
	sendApiRequest(
		'GET',
		'wp/v2/comic_page',
		{
			status: 'publish',
			order: 'desc',
			orderby: 'comic_page_number',
			per_page: 100,
			_embed: 'wp:term',
		}
	) as Promise<ComicPage[]>
) );

/**
 * Extract the image props needed from a comic page API object
 */
export function getImageProps(
	page: ComicPage,
	size: string = 'full'
): {
	src: string
	width: number
	height: number
	alt: string
} {
	const attrs = page.content_blocks[0].attrs;
	let alt = '';
	let image: { url: any; width: any; height: any; };

	if ( ! attrs ) {
		return;
	}

	alt = attrs.pageImage?.alt ?? '';
	image = attrs.pageImage?.sizes?.[ size ] ?? attrs.pageImage;

	if ( ! image ) {
		return;
	}

	return {
		src: image.url,
		width: image.width,
		height: image.height,
		alt: alt
	};
}


/**
 * Find a comic page based on it's page number
 */
export function findPage(
	pages: ComicPage[],
	pageNumber: number
): ComicPage {
	return pages.find(
		page => page.content_blocks[0].attrs.pageNumber === pageNumber
	);
}


/**
 * Get all pages associated with a chapter
 */
export async function getChapterPages(
	chapter: Chapter
): Promise<ComicPage[]> {
	let chapterPages = await sendApiRequest(
		'GET',
		'wp/v2/comic_page',
		{ chapters: chapter.id }
	) as ComicPage[];

	chapterPages = chapterPages.map( chapterPage => ( {
		...chapterPage,
		pageNumber: chapterPage.content_blocks[0].attrs.pageNumber
	} ) );

	chapterPages = sortByAttribute( chapterPages, 'pageNumber' );

	return chapterPages;
}

/**
 * Takes an array of pages and sorts them into child arrays by chapter
 */
export function groupPagesByChapter(
	pages: ComicPage[]
): [ string, { id: number, pages: ComicPage[] } ][]
{
	let chapters: Record<string, { id: number, pages: ComicPage[] }> = {};

	pages.forEach( page => {
		if ( ! page._embedded['wp:term'] ) {
			return;
		}

		page._embedded['wp:term'][0].forEach( ( chapter: Chapter ) => {
			console.log( 'chapter: ', chapter );
			if ( chapters[ chapter.name ] ) {
				chapters[ chapter.name ].pages.push( page );
			} else {
				chapters[ chapter.name ] = {
					id: chapter.id,
					pages: [ page ],
				};
			}
		} );
	} );

	const chapterPages = Object.entries( chapters );

	return chapterPages;
}