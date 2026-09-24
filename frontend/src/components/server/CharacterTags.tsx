import CharacterTag from "./CharacterTag";
import { getChapters, getCharacters } from "@/lib/data-fetching";
import { getFirstChapterSlug } from "@/lib/utilities";
import '@/styles/character-tags.scss';
import { cookies } from "next/headers";

type Props = {
	characters: string[] // Character ids
	chapter?: string // Chapter slug
}

/** Renders a nav with every character in the given list of characters. Optionally pass in a chapter to only show characters who have shown up by then, otherwise it'll use the either the latest read chapter or the first one the character shows up in */
export default async function CharacterTags( { characters, chapter }: Props ) {
	if ( ! characters || characters.length < 1 ) { return }

	const characterData = await getCharacters(
		{ include: characters.join( ',' ) }
	);

	if ( ! characterData ) { return }

	const chapterData = await getChapters() ?? [];
	const cookieStore = await cookies();

	const tags = [];
	for ( let i = 0; i < characterData.length; i++ ) {
		const character = characterData[i];
		const chapterToUse = chapter ??
			cookieStore.get('last-read-chapter')?.value ??
			getFirstChapterSlug( character );

		tags.push(
			<CharacterTag
				key={ character.id }
				character={ character }
				chapter={ chapterToUse }
				chapterData={ chapterData }
			/>
		);
	}

	return (
		<nav className="character-tags">
			{ tags }
		</nav>
	);
}