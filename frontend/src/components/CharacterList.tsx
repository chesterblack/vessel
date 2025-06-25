"use client"

import { WP_REST_API_Character } from "@/types/wp-post-types";
import { WP_REST_API_Chapter } from "@/types/wp-taxonomies";

import { useState } from "react";
import { getLatestDescription } from "@/lib/utilities";
import CharacterBio from "@/components/CharacterBio";
import ChapterSelector from "@/components/ChapterSelector";

interface Props {
	chapters: WP_REST_API_Chapter[]
	characters: WP_REST_API_Character[]
}

export default function CharacterList( { chapters, characters }: Props ) {
	const [ currentChapter, setCurrentChapter ] = useState( chapters[0].slug );

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
					character.content_blocks[0].attrs.descriptions
				);

				if ( ! character.description ) {
					return;
				}

				return <CharacterBio characterData={ character } key={ character.id } />
			} ) }
		</>
	)
}