import { WP_REST_API_Post, WP_REST_API_Page } from "wp-types";
import { Block, CharacterBioBlock, ComicPageBlock } from "./wp-blocks";
import { YoastHead } from "./types";

export type Post = WP_REST_API_Post & {
	content_blocks: Block[]
	locked_to_ids: string[]
	yoast_head?: string
	yoast_head_json?: YoastHead
}

export type WebPage = WP_REST_API_Page & {
	locked_to_ids: string[]
	yoast_head?: string
	yoast_head_json?: YoastHead
}

export type Character = Post & {
	content_blocks: CharacterBioBlock[]
	description?: string
}

export type ComicPage = Post & {
	locked_to_ids: string[]
	locked?: boolean
	content_blocks: ComicPageBlock[]
	meta: {
		comic_page_number?: number
	}
}
