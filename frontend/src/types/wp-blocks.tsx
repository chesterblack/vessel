export type Block = {
	blockName: string
	innerBlocks: Block[]
	innerHTML: string
	innerContent: string[]
	attrs: any
}

export type ImageAttributes = {
	url: string
	width: number
	height: number
	alt: string
}

export type CharacterBioBlock = Block & {
	attrs: {
		chapters: string
	}
}

export type CharacterBioDatum = {
	name?: string
	description?: string
	portrait?: ImageAttributes
	pronouns?: string
}

export type CharacterBioData = {
	[ chapterName: string ]: CharacterBioDatum
}

export type ComicPageBlock = Block & {
	attrs: {
		backgroundGradient: string
		backgroundImage: ImageAttributes | null
		characters: string[]
		pageImage: ImageAttributes & {
			sizes?: {
				comic_page_desktop: ImageAttributes
				comic_page_mobile: ImageAttributes
			}
		}
		pageNumber: number
	}
}