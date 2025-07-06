import { WP_REST_API_Post, WP_REST_API_Page } from "wp-types";
import { CharacterBioBlock, ComicPageBlock } from "./wp-blocks";
import { YoastHead } from "./types";

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


export interface WP_REST_API_Page_Vessel extends WP_REST_API_Page {
	yoast_head?: string
	yoast_head_json?: YoastHead
}
