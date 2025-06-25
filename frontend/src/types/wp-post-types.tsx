import { WP_REST_API_Post } from "wp-types";
import { CharacterBioBlock, ComicPageBlock } from "./wp-blocks";

export interface WP_REST_API_Character extends WP_REST_API_Post {
	content_blocks: CharacterBioBlock[]
	description?: string
}

export interface WP_REST_API_ComicPage extends WP_REST_API_Post {
	content_blocks: ComicPageBlock[]
	meta: {
		comic_page_number?: number
	}
}
