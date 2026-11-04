export type ImageSize = {
	height: number
	width: number
	url: string
	orientation: 'portrait'|'landscape'
}

export type Image = {
	url: string
	width: number
	height: number
	alt: string
}

export type ImageWithSizes = {
	id?: number
	alt: string
	height: number
	sizes: Record<string, ImageSize>
	url: string
	width: number
}

export type KeyMap<M, A> = [ keyof M, keyof A ][]