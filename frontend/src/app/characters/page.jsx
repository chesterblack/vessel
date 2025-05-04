"use client"

import { useEffect, useState } from "react";
import { getLatestDescription, sendApiRequest } from "@/lib/utilities";
import CharacterBio from "@/components/CharacterBio";
import ChapterSelector from "@/components/ChapterSelector";
import "./style.scss";

export default function CharactersPage() {
	const [ characters, setCharacters ] = useState([]);
	const [ chapters, setChapters ] = useState([]);
	const [ currentChapter, setCurrentChapter ] = useState();

	useEffect( () => {
		( async () => {
			const chapterData = await sendApiRequest( 'GET', 'wp/v2/chapters' );
			if ( ! chapterData ) {
				return;
			}
			setChapters( chapterData );
			setCurrentChapter( chapterData[0]?.slug );
		} )();
	}, [] );

	useEffect( () => {
		( async () => {
			const characterData = await sendApiRequest( 'GET', 'wp/v2/character' );
			if ( ! characterData ) {
				return;
			}
			setCharacters( characterData );
		} )();
	}, [] );

	return (
		<main className="characters">
			<h1>Characters</h1>
			<h3>How far have you read?</h3>
			<ChapterSelector
				chapters={ chapters }
				currentChapter={ currentChapter }
				setCurrentChapter={ setCurrentChapter }
			/>
			{ characters.map( ( character ) => {
				character.description = getLatestDescription(
					chapters,
					currentChapter,
					character?.content_blocks?.[0]?.attrs?.descriptions ?? []
				);

				if ( ! character.description ) {
					return;
				}

				return <CharacterBio characterData={ character } currentChapter={ currentChapter } key={ character.id } />
			} ) }
		</main>
	)
}