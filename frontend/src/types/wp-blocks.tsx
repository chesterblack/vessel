export interface Block {
	blockName: string
	innerBlocks: Block[]
	innerHTML: string
	innerContent: string[]
	attrs: any
}

export interface ImageAttributes {
	url: string
	width: number
	height: number
	alt: string
}

export interface CharacterBioBlock extends Block {
	attrs: {
		chapters: string
	}
}

export interface CharacterBioDatum {
	name?: string
	description?: string
	portrait?: ImageAttributes
}

export interface CharacterBioData {
	[ chapterName: string ]: CharacterBioDatum
}

export interface ComicPageBlock extends Block {
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