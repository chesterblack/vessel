import { Metadata } from 'next';
import { WP_REST_API_Chapter } from '@/types/wp-taxonomies';
import { WP_REST_API_Character } from '@/types/wp-post-types';

import '@/styles/characters.scss';
import CharacterList from "@/components/CharacterList";
import { sendApiRequest } from '@/lib/utilities';

export const metadata: Metadata = {
	title: 'Meet the characters of Vessel',
	description: 'Meet the characters that Percy has met along his journey!'
}

export default async function CharactersPage() {
	const chapterData = await sendApiRequest( 'GET', 'wp/v2/chapters' ) as WP_REST_API_Chapter[];
	const characterData = await sendApiRequest( 'GET', 'wp/v2/character' ) as WP_REST_API_Character[];

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