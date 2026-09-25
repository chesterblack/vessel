import { PageNumber } from "@/types/types";
import { CharacterBioData, CharacterBioDatum } from "@/types/wp-blocks";
import { Character, ComicPage, Post } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { Metadata } from "next";

import { WP_Term } from "wp-types";

import { getComicPages } from "@/lib/data-fetching";

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

	console.log( 'findme: url: ', url );

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
) {
	const chapterSlugs = chapters.map( ( c: { slug: string } ) => c.slug );

	let info: CharacterBioDatum = {
		name: null,
		description: null,
		portrait: null,
	};

	for ( let i = 0; i < chapterSlugs.length; i++ ) {
		const slug = chapterSlugs[i];

		if ( ! characterInfo[ slug ] ) {
			if ( slug === currentChapter ) {
				break;
			}

			continue;
		}

		const { name, description, portrait, pronouns } = characterInfo[ slug ];

		if ( name && name !== '' ) {
			info.name = characterInfo[ slug ].name;
		}

		if ( pronouns && pronouns !== '' ) {
			info.pronouns = characterInfo[slug].pronouns;
		}

		if ( description && description !== '' ) {
			info.description = characterInfo[ slug ].description;
		}

		if ( portrait ) {
			info.portrait = characterInfo[ slug ].portrait;
		}

		if ( slug === currentChapter ) {
			break;
		}
	}

	return info;
}

/**
 * Get the first available description for a character
 */
export function getFirstDescription( character: Character ) {
	const firstChapter = getFirstChapter( character );
	return firstChapter.description ?? '';
}

/**
 * Get the first chapter the character shows up in
 */
export function getFirstChapter( character: Character ) {
	const chapterData = getCharacterBioData( character );
	return chapterData[ Object.keys( chapterData )[0] ];
}

/**
 * Get the slug of the first chapter the character shows up in
 */
export function getFirstChapterSlug( character: Character ) {
	const chapterData = getCharacterBioData( character );
	return Object.keys( chapterData )[0];
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
): ComicPage | undefined {
	return pages.find(
		page => page.meta.comic_page_number === pageNumber
	);
}

/**
 * Get all pages associated with a chapter
 */
export async function getChapterPages(
	chapter: Chapter
): Promise<ComicPage[]> {
	let chapterPages: ComicPage[] = await sendApiRequest(
		'GET',
		'wp/v2/comic_page',
		{
			chapters: chapter.id,
			per_page: 100
		}
	);

	chapterPages = chapterPages.map( chapterPage => ( {
		...chapterPage,
		pageNumber: chapterPage.meta.comic_page_number
	} ) );

	chapterPages = sortByAttribute( chapterPages, 'pageNumber' );

	return chapterPages;
}

/**
 * Takes an array of pages and sorts them into an array containing either the page itself
 * or the chapter that it belongs to whenever it finds a new chapter
 */
export function groupPagesByChapter(
	pages: ComicPage[]
): ( {
		type: 'chapter'
		content: Chapter
	} | {
		type: 'page'
		content: ComicPage
	} )[]
{
	let components = [];
	let previousChapter: string = null;

	pages.forEach( page => {
		if ( ! page._embedded['wp:term'][0] ) {
			return;
		}

		const embeddedChapters = getEmbeddedChapters( page );

		if ( embeddedChapters ) {
			const chapter = embeddedChapters[0];

			if ( chapter.name !== previousChapter ) {
				components.push( {
					type: 'chapter',
					content: chapter
				} );
			}

			components.push( {
				type: 'page',
				content: page
			} );

			previousChapter = chapter.name;
		}
	} );

	return components;
}

/**
 * Turns a PageNumber into a number
 */
export async function numeralisePageNumber(
	pageNumber: PageNumber,
	pages?: ComicPage[]
): Promise<number> {
	pages = pages ?? await getComicPages();

	let number = pageNumber === 'latest' ? filterLatestPageNumber( pages ) : pageNumber;
	number = typeof number !== 'number' ? parseInt( number ) : number;

	return number;
}

export function filterLatestPageNumber( pages: ComicPage[] ): number {
	const pageNumbers = pages.map( page => page.meta.comic_page_number );
	return Math.max( ...pageNumbers );
}

/**
 * Is the page the most recent
 */
export async function isLatestPage( page: ComicPage ): Promise<boolean> {
	const pages = await getComicPages( [ 'all' ] );
	return pages.length === page.meta.comic_page_number;
}

/**
 * Generate the metadata required for a read page
 */
export async function getComicPageMetadata(
	pageData: ComicPage
): Promise<Metadata> {
	const metadata: Metadata = {};

	const imageProps = getImageProps( pageData );

	metadata.description = `Read page ${ pageData.meta.comic_page_number } of Vessel here!`;
	metadata.title = `Vessel | ${pageData.title.rendered}`;
	if ( pageData?.yoast_head_json?.og_description ) {
		metadata.description = pageData.yoast_head_json.og_description;
	} else if ( imageProps.alt !== '' ) {
		metadata.description = imageProps.alt;
	}

	metadata.openGraph = {
		type: "website",
		url: "https://vesselcomic.com",
		title: `Vessel | ${pageData.title.rendered}`,
		description: "A medieval fantasy webcomic about a man on a journey to deliver a world-healing vessel of magic to a powerful mage. Who is this mage? He doesn\'t really know yet. Where are they? That\'s also up in the air. Does he want to do this? Not really.",
		siteName: "Vessel",
		images: [
			{ url: "https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/opengraph-image.jpg" }
		]
	}

	return metadata;
}

export function getEmbeddedChapters(
	post: ComicPage
): Chapter[] {
	const terms = post?._embedded?.[ 'wp:term' ] as WP_Term[][];

	if ( ! terms ) {
		return [];
	}

	const chapters = [];

	terms.forEach( taxonomy => {
		taxonomy.forEach( term => {
			if ( term.taxonomy === 'chapters' ) {
				chapters.push( term );
			}
		} );
	} );

	return chapters;
}

/*
 * Extract all data from the JSON attribute in the
 * character block
 */
export function getCharacterBioData( character: Character ) {
	if ( ! character.content_blocks[0].attrs?.chapters ) {
		return;
	}
	
	const characterBlockData: CharacterBioData = JSON.parse(
		character.content_blocks[0].attrs.chapters
	);

	return characterBlockData;
}

export function isNumeric( number: number|string ) {
	return typeof number === 'number' || ! isNaN( parseInt( number.toString() ) );
}

export function arraysHaveOverlap(
	array1: any[],
	array2: any[]
) {
	const set1 = new Set( array1 );
	const set2 = new Set( array2 );

	return set1.intersection( set2 ).size > 0;
}

export function removeLockedPosts<T extends { locked?: boolean }>( posts: T[] ): T[] {
	return posts.filter( post => ! post.locked );
}

/**
 * Adds the 'locked' attribute to an array of posts based on
 * a user's role list
 */
export function applyLockedAttribute<T extends Post>(
	roles: string[],
	posts: T[]
): T[] {
	if ( roles && roles.includes( 'all' ) ) {
		return posts;
	}

	if ( ! posts ) {
		console.error( 'No posts found when locking' );
		return;
	}

	const allowedPosts = posts.map( post => {
		if (
			! post.locked_to_ids ||
			post.locked_to_ids.length < 1
		) {
			return {
				locked: false,
				...post
			}
		}

		if ( arraysHaveOverlap( roles, post.locked_to_ids ) ) {
			return {
				locked: false,
				...post,
			};
		};

		return {
			locked: true,
			...post
		}
	} );

	return allowedPosts;
}

/**
 * Checks if a comic page has either no written content or just empty paragraphs
 */
export function isContentEmpty( page: ComicPage ) {
	if ( !page?.content?.rendered ) {
		return true;
	}

	const isEmptyParagraph = !!page.content.rendered.match( /^(\\n)*?<p ?.*?><\/p>(\\n)*$/gm )?.length;

	return isEmptyParagraph;
}

export function getCookie( key: string ) {
	if ( typeof document === 'undefined' ) {
		console.error('Trying to get cookie on server');
		return;
	}

	const fullString = document?.cookie.split(";").find( i => i.trim().startsWith(`${key}=`));
	if (!fullString) {
		return;
	}

	return fullString.split('=')[1];
}

export function hasCookie( key: string ) {
	if ( typeof document === 'undefined' ) {
		console.error('Trying to get cookie on server');
		return;
	}

	return document?.cookie.split(";").some( i => i.trim().startsWith(`${key}=`));
}

export function setCookie(
	key: string,
	value: string,
	expiryDate: Date|string = null,
	path: string = '/'
) {
	if ( typeof document === 'undefined' ) {
		console.error('Trying to set cookie on server');
		return;
	}

	if ( !expiryDate ) {
		expiryDate = new Date();
		const time = expiryDate.getTime();
		const expireTime = time + 60000 * 60 * 24 * 30 // 30 days
		expiryDate.setTime( expireTime );
	}

	if ( typeof expiryDate !== 'string' ) {
		expiryDate = expiryDate.toUTCString();
	}

	document.cookie = `${ key }=${ value };expires=${ expiryDate };path=${ path }`;
}

export function isLocked(
	post: { role_locks: string[] },
	user?: { roles: string[] }
) {
	if ( post && post.role_locks.length === 0 ) {
		return false;
	}

	return !arraysHaveOverlap(
		post?.role_locks ?? [],
		user?.roles ?? []
	);
}