import { cache } from "react";
import { applyLockedAttribute, arraysHaveOverlap, isNumeric, sendApiRequest } from "./utilities";
import { Character, ComicPage, Post, WebPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { WP_REST_API_Post, WP_REST_API_Taxonomy } from "wp-types";
import { ComicIndex, ComicReaderData } from "@/types/types";

type ContentType = 'posts' | 'pages' | 'chapters' | 'comic_page'| 'character' | 'fanart';

export function getPosts(
	contentType: ContentType,
	extraParams?: any
): Promise<WP_REST_API_Post[] | WP_REST_API_Taxonomy[]> {
	const defaultParams = {
		status: 'publish',
		order: 'desc',
		per_page: 100
	};

	const params = {
		...defaultParams,
		...extraParams
	};

	return sendApiRequest( 'GET', `wp/v2/${ contentType }`, params );
}

export async function getPost(
	contentType: ContentType,
	identifier: number|string,
	extraParams?: any
): Promise<WP_REST_API_Post | WP_REST_API_Taxonomy> {
	if ( ! identifier ) {
		throw new Error( 'Invalid identifier' );
	}

	const defaultParams = {
		status: 'publish',
	};

	const params = {
		...defaultParams,
		...extraParams
	};

	let url = `wp/v2/${ contentType }/`;

	if ( isNumeric( identifier ) ) {
		url += identifier;
	} else {
		params.slug = identifier;
	}

	const response = await sendApiRequest( 'GET', url, params );
	if ( response.length < 1 ) {
		// throw new Error( 'No posts found' );
		return
	}

	return response[ 0 ];
}


// ----------------------------
// Post type specific functions
// ----------------------------

export const getChapters = cache( async () => {
	const chapters = await getPosts( 'chapters' ) as Chapter[];
	const notEmpty = chapters.filter( chapter => chapter.count > 0 );
	const reversed = notEmpty.reverse();

	return reversed;
} );

export const getPageIndexes = async (currentPageNumber: number, chapter?: string) => {
	const response = await sendApiRequest(
		'GET',
		'vessel/v1/page-indexes',
		{
			chapter: chapter ?? '',
			current: currentPageNumber
		}
	) as ComicIndex[];
	
	if ( response.length < 1 ) {
		return;
	}

	return response;
}

export const getComicPages = async ( roles?: string[] ) => {
	const options = {
		orderby: 'comic_page_number',
		_embed: 'wp:term'
	}

	const posts = await getPosts(
		'comic_page',
		options
	) as ComicPage[];

	return applyLockedAttribute( roles, posts );
};

export const getCharacters = cache( ( params?: any ) => (
	getPosts( 'character', params ) as Promise<Character[]>
) );

export const getWebPages = cache( ( params?: any ) => (
	getPosts( 'pages', params ) as Promise<WebPage[]>
) );

export const getBlogPosts = cache( () => (
	getPosts( 'posts', { _embed: true } ) as Promise<Post[]>
) );

export const getChapter = cache(
	( identifier: number|string, params?: any ) => (
		getPost( 'chapters', identifier, params ) as Promise<Chapter>
	)
);

export const getComicReaderData = cache(
	async ( pageNumber: number ) => {
		const response = await sendApiRequest(
			'GET',
			`vessel/v1/read-page/${pageNumber}`
		);

		return response as ComicReaderData;
	}
)

export const getLatestPageNumber = cache(
	async () => {
		const response = await sendApiRequest(
			'GET',
			'wp/v2/comic_page',
			{
				per_page: 1,
				orderby: 'comic_page_number',
				_embed: 'wp:term'
			}
		) as ComicPage[];
		
		if ( response.length < 1 ) {
			return;
		}

		return response[0]?.meta?.comic_page_number;
	}
)

export const getComicPage = cache(
	async ( comicPageNumber: number ) => {
		const response = await sendApiRequest(
			'GET',
			'wp/v2/comic_page',
			{
				meta_key: 'comic_page_number',
				meta_value: comicPageNumber,
				orderby: 'comic_page_number',
				_embed: 'wp:term'
			}
		) as ComicPage[];

		if ( response.length < 1 ) {
			return;
		}

		return response[0];
	}
);

export const getCharacter = cache(
	( identifier: number|string, params?: any ) => (
		getPost( 'character', identifier, params ) as Promise<Character>
	)
);

export const getWebPage = cache(
	( identifier: number|string, params?: any ) => (
		getPost( 'pages', identifier, params ) as Promise<WebPage>
	)
);

export const getBlogPost = cache(
	( identifier: number|string, params?: any ) => (
		getPost( 'posts', identifier, { _embed: true, ...params } ) as Promise<Post>
	)
);
