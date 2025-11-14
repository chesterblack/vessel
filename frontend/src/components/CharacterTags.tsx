import { getEmbeddedChapters } from "@/lib/utilities";
import CharacterTag from "./CharacterTag";
import { Character, ComicPage } from "@/types/wp-post-types";
import { getCharacters } from "@/lib/data-fetching";

interface Props {
	characters: string[]
	pageData: ComicPage
}

export default async function CharacterTags( { characters, pageData }: Props ) {
	if ( ! characters || characters.length < 1 ) {
		return;
	}

	const characterData = await getCharacters(
		{ include: characters.join( ',' ) }
	);

	if ( ! characterData ) {
		return;
	}

	const tags = [];
	characterData.forEach( ( character: Character ) => {
		const chapters = getEmbeddedChapters( pageData );

		tags.push(
			<CharacterTag
				key={ character.id }
				character={ character }
				chapter={ chapters[0] }
			/>
		);
	} );

	return (
		<nav className="character-tags">
			<h3>Characters on this page:</h3>
			{ tags }
		</nav>
	);
}