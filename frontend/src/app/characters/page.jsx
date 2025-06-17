import '@/styles/characters.scss';
import CharacterList from "@/components/CharacterList";
import { sendApiRequest } from '@/lib/utilities';

export default async function CharactersPage() {
	const chapterData = await sendApiRequest( 'GET', 'wp/v2/chapters' );
	const characterData = await sendApiRequest( 'GET', 'wp/v2/character' );

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