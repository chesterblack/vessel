import { WP_REST_API_Post, WP_REST_API_Page } from "wp-types";
import { Block, CharacterBioBlock, ComicPageBlock } from "./wp-blocks";
import { YoastHead } from "./types";

export interface Post extends WP_REST_API_Post {
	content_blocks: Block[]
	locked_to_ids: string[]
	yoast_head?: string
	yoast_head_json?: YoastHead
}

export interface WebPage extends WP_REST_API_Page {
	locked_to_ids: string[]
	yoast_head?: string
	yoast_head_json?: YoastHead
}

export interface Character extends Post {
	content_blocks: CharacterBioBlock[]
	description?: string
}

export interface ComicPage extends Post {
	locked_to_ids: string[]
	content_blocks: ComicPageBlock[]
	meta: {
		comic_page_number?: number
	}
}
