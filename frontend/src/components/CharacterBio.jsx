import Image from "next/image";

export default function CharacterBio( { characterData } ) {
	const imageSize = 150;

	const characterName = characterData?.title?.rendered;
	const portrait = characterData?.content_blocks[0]?.attrs?.portrait;
	const description = characterData.description;

	let portraitImage = <Image src={ '/fallback-image-500.png' } width={ imageSize } height={ imageSize } alt={ characterName } />;

	if ( portrait?.url ) {
		portraitImage = <Image
			src={ portrait.url }
			width={ imageSize }
			height={ imageSize }
			alt={ portrait.alt ?? portrait.title ?? characterName }
		/>
	}

	return (
		<div className="character-bio">
			<h2>{ characterName }</h2>
			<div className="character-bio__inner">
				{ portraitImage }
				<p dangerouslySetInnerHTML={ { __html: description } } />
			</div>
		</div>
	);
}