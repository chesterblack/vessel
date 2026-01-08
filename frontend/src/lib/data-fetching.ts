import { cache } from "react";
import { arraysHaveOverlap, isNumeric, sendApiRequest } from "./utilities";
import { Character, ComicPage, Post, WebPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { WP_REST_API_Post, WP_REST_API_Taxonomy } from "wp-types";

type ContentType = 'posts' | 'pages' | 'chapters' | 'comic_page'| 'character';

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
		throw new Error( 'No posts found' );
	}

	return response[ 0 ];
}


// ----------------------------
// Post type specific functions
// ----------------------------

export const getChapters = cache( async () => {
	const chapters = await getPosts( 'chapters' ) as Chapter[];
	return chapters.filter( chapter => chapter.count > 0 );
} );

export const getComicPages = async ( roles?: string[] ) => {
	const options = {
		orderby: 'comic_page_number',
		_embed: 'wp:term'
	}

	const posts = await getPosts(
		'comic_page',
		options
	) as ComicPage[];

	if ( roles && roles.includes( 'all' ) ) {
		return posts;
	}

	const allowedPosts = posts.filter( post => {
		if (
			! post.locked_to_ids ||
			post.locked_to_ids.length < 1
		) {
			return true;
		}

		return arraysHaveOverlap( roles, post.locked_to_ids );
	} );

	return allowedPosts;
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

export const getComicPage = cache(
	( identifier: number|string, params?: any ) => (
		getPost( 'comic_page', identifier, params ) as Promise<ComicPage>
	)
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
