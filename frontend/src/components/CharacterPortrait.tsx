import { ReactNode } from "react";

import Image from "next/image";
import { Character } from "@/types/wp-post-types";


interface Props {
	character: Character
	size?: number | [ number, number ]
}

export default function CharacterPortrait( { character, size = 150 }: Props ): ReactNode {
	const portrait = character?.content_blocks[0]?.attrs?.portrait;
	const characterName = character.title.rendered;

	size = typeof size === 'number' ? [ size, size ] : size;

	let portraitImage = <Image
		className='character-portrait'
		src={ '/fallback-image-500.png' }
		width={ size[ 0 ] }
		height={ size[ 1 ] }
		alt={ characterName }
	/>;

	if ( portrait?.url ) {
		portraitImage = <Image
			className='character-portrait'
			src={ portrait.url }
			width={ size[ 0 ] }
			height={ size[ 1 ] }
			alt={ portrait.alt ?? characterName }
		/>
	}

	return portraitImage;
}