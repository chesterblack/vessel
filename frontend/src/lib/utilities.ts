import { PageNumber } from "@/types/types";
import { CharacterBioBlock, CharacterBioData, CharacterBioDatum } from "@/types/wp-blocks";
import { Character, ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { Metadata } from "next";

import { cache } from "react";

/**
 * Send a request to the backend API, include the wp/v2/
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
export function getLatestCharacterBioData(
	chapters: Chapter[],
	currentChapter: string,
	characterInfo: CharacterBioData
): CharacterBioDatum {
	if ( characterInfo[ currentChapter ] ) {
		return characterInfo[ currentChapter ];
	}

	const chapterSlugs = chapters.map( ( c: { slug: string } ) => c.slug );

	let info = {
		name: null,
		description: null,
		portrait: null,
	} as CharacterBioDatum;

	for ( let i = 0; i < chapterSlugs.length; i++ ) {
		const slug = chapterSlugs[i];
		if ( slug === currentChapter ) {
			break;
		}

		if ( characterInfo[ slug ]?.name ) {
			info.name = characterInfo[ slug ].name;
		}

		if ( characterInfo[ slug ]?.description ) {
			info.description = characterInfo[ slug ].description;
		}

		if ( characterInfo[ slug ]?.portrait ) {
			info.portrait = characterInfo[ slug ].portrait;
		}
	}

	return info;
}


/**
 * Get the first available description for a character
 */
export function getFirstDescription(
	character: Character
): string {
	const chapterData = JSON.parse(
		character.content_blocks[0].attrs.chapters
	) as CharacterBioData;

	const firstDatum = chapterData[
		Object.keys( chapterData )[0]
	];

	return firstDatum.description ?? '';
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
		if ( ! page._embedded['wp:term'][0] ) {
			return;
		}

		const embeddedChapters = page._embedded['wp:term'][0] as Chapter[];

		embeddedChapters.forEach( chapter => {
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

/**
 * Turns a PageNumber into a number
 */
export async function numeralisePageNumber(
	pageNumber: PageNumber
): Promise<number> {
	const pages = await getPages();

	let number = pageNumber === 'latest' ? pages.length : pageNumber;
	number = typeof number !== 'number' ? parseInt( number ) : number;

	return number;
}

/**
 * Is the page the most recent
 */
export async function isLatestPage( page: ComicPage ): Promise<boolean> {
	const pages = await getPages();
	return pages.length === page.meta.comic_page_number;
}

/**
 * Generate the metadata required for a read page
 */
export async function getComicPageMetadata(
	page: PageNumber
): Promise<Metadata> {
	const metadata: Metadata = {};

	const pages = await getPages();
	const pageNumber = await numeralisePageNumber( page );
	const pageData = findPage( pages, pageNumber );

	metadata.title = `Page ${ pageNumber } | Vessel`;
	if ( await isLatestPage( pageData ) ) {
		metadata.title = `Latest | Vessel`;
		metadata.alternates = {
			canonical: `${ process.env.NEXT_PUBLIC_FRONTEND_URL }`
		};
	}

	metadata.description = `Read page ${ pageNumber } of Vessel here!`;
	if ( pageData?.yoast_head_json?.og_description ) {
		metadata.description = pageData.yoast_head_json.og_description;
	} else if ( getImageProps( pageData ).alt !== '' ) {
		metadata.description = getImageProps( pageData ).alt;
	}

	return metadata;
}