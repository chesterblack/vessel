import { ReactNode } from "react";

import Image from "next/image";
import { ImageAttributes } from "@/types/wp-blocks";


type Props = {
	portrait?: ImageAttributes
	characterName?: string
	size?: number | [ number, number ]
}

export default function CharacterPortrait( { portrait, characterName, size = 150 }: Props ): ReactNode {
	size = typeof size === 'number' ? [ size, size ] : size;

	let portraitImage = <Image
		className='character-portrait'
		src={ '/fallback-image-500.png' }
		fill
		objectFit="cover"
		alt={ characterName ?? 'Portrait' }
	/>;

	if ( portrait?.url ) {
		portraitImage = <Image
			className='character-portrait'
			src={ portrait.url }
			fill
			objectFit="cover"
			alt={ portrait.alt ?? characterName }
		/>
	}

	return (
		<figure className="character-portrait-frame" style={{ position: 'relative' }}>
			{ portraitImage }
		</figure>
	);
}