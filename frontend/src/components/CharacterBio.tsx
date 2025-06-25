import { WP_REST_API_Character } from "@/types/wp-post-types";
import Image from "next/image";

interface Props {
	characterData: WP_REST_API_Character
}

export default function CharacterBio( { characterData }: Props ) {
	const imageSize = 150;

	if ( ! characterData ) {
		return;
	}

	const characterName = characterData?.title?.rendered;
	const portrait = characterData?.content_blocks[0]?.attrs?.portrait;
	const description = characterData.description;

	let portraitImage = <Image src={ '/fallback-image-500.png' } width={ imageSize } height={ imageSize } alt={ characterName } />;

	if ( portrait?.url ) {
		portraitImage = <Image
			src={ portrait.url }
			width={ imageSize }
			height={ imageSize }
			alt={ portrait.alt ?? characterName }
		/>
	}

	return (
		<div className="character-bio">
			{ portraitImage }
			<div>
				<h2>{ characterName }</h2>
				<p dangerouslySetInnerHTML={ { __html: description } } />
			</div>
		</div>
	);
}