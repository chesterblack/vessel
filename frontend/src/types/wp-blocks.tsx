interface Block {
	blockName: string
	innerBlocks: Block[]
	innerHTML: string
	innerContent: string[]
	attrs: any
}

interface ImageAttributes {
	url: string
	width: number
	height: number
	alt: string
}

export interface CharacterBioBlock extends Block {
	attrs: {
		portrait: ImageAttributes
		descriptions: Record<string, string>
	}
}

export interface ComicPageBlock {
	attrs: {
		pageImage: ImageAttributes,
		pageNumber: number
	}
}