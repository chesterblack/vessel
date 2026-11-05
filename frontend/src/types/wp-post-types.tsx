import { WP_REST_API_Post, WP_REST_API_Page } from "wp-types";
import { Block, CharacterBioBlock, CharacterBioData, ComicPageBlock } from "./wp-blocks";
import { Image, YoastHead } from "./types";

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

type CharacterMeta = {
	chapters?: {
		chapter: string
		name: string
		portrait: Image
		description: string
		pronouns: string
	}[]
	comic_pages?: number[]
}

export type Character = Post & {
	content_blocks: CharacterBioBlock[]
	description?: string
	meta: CharacterMeta
}

type ComicPageMeta = {
	comic_page_number: number
	page_image: Image
	characters?: number[]
	background_gradient?: string
	background_image?: Image
}

export type ComicPage = Post & {
	locked_to_ids: string[]
	locked?: boolean
	content_blocks: [ ComicPageBlock, ...any ]
	meta: ComicPageMeta
}

type FanartMeta = {
	pageImage: Image
	creditName: string
	creditLink?: string
	characters?: number[]
}

export type Fanart = Post & {
	meta: FanartMeta
}