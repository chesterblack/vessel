import CharacterTag from "./CharacterTag";
import { Character } from "@/types/wp-post-types";
import { getChapter, getCharacters } from "@/lib/data-fetching";
import { Chapter } from "@/types/wp-taxonomies";
import '@/styles/character-tags.scss';
import { Children } from "@/types/types";

interface Props {
	characters: string[] // Character ids
	chapter?: Chapter
	label?: Children
}

export default async function CharacterTags( { characters, chapter, label = <h3>Characters on this page:</h3> }: Props ) {
	if ( ! characters || characters.length < 1 ) {
		return;
	}

	const characterData = await getCharacters(
		{ include: characters.join( ',' ) }
	);

	if ( ! characterData ) {
		return;
	}

	chapter = chapter ?? await getChapter( 'intro' );

	const tags = [];
	characterData.forEach( ( character: Character ) => {
		tags.push(
			<CharacterTag
				key={ character.id }
				character={ character }
				chapter={ chapter }
			/>
		);
	} );

	return (
		<nav className="character-tags">
			{ label }
			{ tags }
		</nav>
	);
}