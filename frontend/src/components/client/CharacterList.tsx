"use client"

import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import { useState } from "react";
import CharacterBio from "@/components/server/CharacterBio";
import ChapterSelector from "@/components/server/ChapterSelector";
import Link from "next/link";

interface Props {
	chapters: Chapter[]
	characters: Character[]
	defaultChapter: string
}

/**
 * A chapter selector and list of linked characters, based on the selected chapter.
 */
export default function CharacterList( { chapters, characters, defaultChapter }: Props ) {
	const [ currentChapter, setCurrentChapter ] = useState( defaultChapter );

	return (
		<>
			<ChapterSelector
				chapters={ chapters }
				currentChapter={ currentChapter }
				selectCallback={ setCurrentChapter }
			/>

			{ characters.map( ( character ) => {
				return (
					<CharacterBio
						key={ character.id }
						character={ character }
						chapters={ chapters }
						currentChapter={ currentChapter }
						headingLevel={ 2 }
						link={ true }
					/>
				);
			} ) }
		</>
	)
}