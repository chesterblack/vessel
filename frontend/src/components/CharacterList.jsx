"use client"

import { useState } from "react";

import { getLatestDescription } from "@/lib/utilities";
import CharacterBio from "@/components/CharacterBio";
import ChapterSelector from "@/components/ChapterSelector";

export default function CharacterList( { chapters, characters } ) {
	const [ currentChapter, setCurrentChapter ] = useState( chapters[0]?.slug );

	return (
		<>
			<div className="how-far">
				<h2>How far have you read?</h2>
				<ChapterSelector
					chapters={ chapters }
					currentChapter={ currentChapter }
					setCurrentChapter={ setCurrentChapter }
				/>
			</div>

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
		</>
	)
}