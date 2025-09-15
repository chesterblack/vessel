"use client"

import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import { useState } from "react";
import { getCharacterBioData, getLatestCharacterBioData } from "@/lib/utilities";
import CharacterBio from "@/components/CharacterBio";
import ChapterSelector from "@/components/ChapterSelector";
import { CharacterBioBlock, CharacterBioData } from "@/types/wp-blocks";

interface Props {
	chapters: Chapter[]
	characters: Character[]
}

export default function CharacterList( { chapters, characters }: Props ) {
	const [ currentChapter, setCurrentChapter ] = useState( chapters[0].slug );

	return (
		<>
			<ChapterSelector
				chapters={ chapters }
				currentChapter={ currentChapter }
				setCurrentChapter={ setCurrentChapter }
			/>

			{ characters.map( ( character ) => {
				const characterBlockData = getCharacterBioData( character );

				const characterBio = getLatestCharacterBioData(
					chapters,
					currentChapter,
					characterBlockData
				);

				return (
					<CharacterBio
						character={ character }
						characterBio={ characterBio }
						key={ character.id }
					/>
				);
			} ) }
		</>
	)
}