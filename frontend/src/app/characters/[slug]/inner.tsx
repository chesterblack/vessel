"use client"

import ChapterSelector from "@/components/server/ChapterSelector";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { useState } from "react";
import CharacterBio from "@/components/server/CharacterBio";

interface Props {
	character: Character
	chapters: Chapter[]
	defaultChapter: string
}

export default function Inner( { character, chapters, defaultChapter }: Props ) {
	const [ currentChapter, setCurrentChapter ] = useState( defaultChapter );

	return (
		<>
			<ChapterSelector
				chapters={ chapters }
				currentChapter={ currentChapter }
				selectCallback={ setCurrentChapter }
			/>
			<div className="character-profile">
				<CharacterBio
					character={ character }
					chapters={ chapters }
					currentChapter={ currentChapter }
				/>
			</div>
		</>
	)
}