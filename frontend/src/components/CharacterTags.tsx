import CharacterTag from "./CharacterTag";
import { getChapters, getCharacters } from "@/lib/data-fetching";
import { getFirstChapterSlug } from "@/lib/utilities";
import '@/styles/character-tags.scss';
import { Suspense } from "react";
import { cookies } from "next/headers";

interface Props {
	characters: string[] // Character ids
}

export default async function CharacterTags( { characters }: Props ) {
	const cookieStore = await cookies();

	if ( ! characters || characters.length < 1 ) {
		return;
	}

	const characterData = await getCharacters(
		{ include: characters.join( ',' ) }
	);

	if ( ! characterData ) {
		return;
	}

	const chapterData = await getChapters() ?? [];

	const tags = [];
	for ( let i = 0; i < characterData.length; i++ ) {
		const character = characterData[i];
		const firstChapter = getFirstChapterSlug( character );
		const chapterToUse = cookieStore.get('last-read-chapter')?.value ?? firstChapter;

		tags.push(
			<CharacterTag
				key={ character.id }
				character={ character }
				chapter={chapterToUse}
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