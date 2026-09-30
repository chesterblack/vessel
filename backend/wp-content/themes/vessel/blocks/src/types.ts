export type ImageSize = {
	height: number
	width: number
	url: string
	orientation: 'portrait'|'landscape'
}

export type Image = {
	id?: number
	alt: string
	height: number
	sizes: Record<string, ImageSize>
	url: string
	width: number
}