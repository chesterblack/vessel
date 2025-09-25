import { ImageAttributes } from "@/types/wp-blocks"

interface Props {
	backgroundGradient: string
	backgroundImage: ImageAttributes
}

export default function Background( { backgroundGradient, backgroundImage }: Props ) {
	if ( ! backgroundGradient && ! backgroundImage ) {
		return;
	}

	let background: string;

	if ( backgroundGradient && ! backgroundImage ) {
		background = `background: ${ backgroundGradient }`;
	} else {
		background = `background-image: url( ${ backgroundImage.url } ), ${ backgroundGradient };`;
	}

	return (
		<style>
			{ `
				body {
					${ background }
				}
			` }
		</style>
	)
}