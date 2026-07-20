import CharacterTag from "./CharacterTag";
import { getChapter, getCharacters } from "@/lib/data-fetching";
import { Chapter } from "@/types/wp-taxonomies";
import { getFirstChapterSlug } from "@/lib/utilities";
import '@/styles/character-tags.scss';

interface Props {
	characters: string[] // Character ids
	chapter?: Chapter
}

export default async function CharacterTags( { characters, chapter }: Props ) {
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
	for (let i = 0; i < characterData.length; i++) {
		const character = characterData[i];
		const chapterToUse = chapter ?? await getChapter( getFirstChapterSlug( character ) );

		tags.push(
			<CharacterTag
				key={ character.id }
				character={ character }
				chapter={ chapterToUse }
			/>
		);
	}

	return (
		<nav className="character-tags">
			{ tags }
		</nav>
	);
}