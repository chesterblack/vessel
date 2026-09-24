import { ImageAttributes } from "@/types/wp-blocks"

type Props = {
	backgroundGradient: string
	backgroundImage?: ImageAttributes
}

/**
 * Injects a style tag that gives the body the given background
 */
export default function Background( { backgroundGradient, backgroundImage }: Props ) {
	if ( ! backgroundGradient && ! backgroundImage ) {
		return null;
	}

	let background: string;

	if ( backgroundGradient && ! backgroundImage ) {
		background = `background: ${ backgroundGradient };`;
	} else {
		background = `
			background-image: url( ${ backgroundImage.url } ), ${ backgroundGradient };
			background-position: bottom 160px left 0;
			background-repeat: repeat-x;
		`;
	}

	return (
		<style>
			{ `body { ${ background } }` }
		</style>
	)
}