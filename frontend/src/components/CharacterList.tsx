"use client"

import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import { useState } from "react";
import { getLatestDescription } from "@/lib/utilities";
import CharacterBio from "@/components/CharacterBio";
import ChapterSelector from "@/components/ChapterSelector";

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
				const description = getLatestDescription(
					chapters,
					currentChapter,
					character.content_blocks[0].attrs.descriptions
				);

				if ( ! description ) {
					return;
				}

				return (
					<CharacterBio
						characterData={ character }
						characterDescription={ description }
						key={ character.id }
					/>
				);
			} ) }
		</>
	)
}