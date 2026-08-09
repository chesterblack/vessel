import { Metadata } from 'next';

import '@/styles/characters.scss';
import CharacterList from "@/components/client/CharacterList";
import { getChapters, getCharacters } from '@/lib/data-fetching';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Meet the characters of Vessel',
	description: 'Meet the characters that Percy has met along his journey!'
}

/**
 * Main archive page showcasing all characters
 */
export default async function CharactersPage() {
	const chapterData = await getChapters();
	const characterData = await getCharacters();
	const cookieStore = await cookies();

	const lastReadChapter = cookieStore.get('last-read-chapter')?.value ?? chapterData[0].slug;

	return (
		<main className="characters">
			<h1>Characters</h1>
			<p>
				Meet the characters that Percy has met along his journey!
			</p>
			<CharacterList
				chapters={ chapterData }
				characters={ characterData }
				defaultChapter={ lastReadChapter }
			/>
		</main>
	)
}