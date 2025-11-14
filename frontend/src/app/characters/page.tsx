import { Metadata } from 'next';

import '@/styles/characters.scss';
import CharacterList from "@/components/CharacterList";
import { getChapters, getCharacters } from '@/lib/data-fetching';

export const metadata: Metadata = {
	title: 'Meet the characters of Vessel',
	description: 'Meet the characters that Percy has met along his journey!'
}

export default async function CharactersPage() {
	const chapterData   = await getChapters();
	const characterData = await getCharacters();

	return (
		<main className="characters">
			<h1>Characters</h1>
			<p>
				Meet the characters that Percy has met along his journey!
			</p>
			<CharacterList
				chapters={ chapterData }
				characters={ characterData }
			/>
		</main>
	)
}