"use client"

import ChapterSelector from "@/components/ChapterSelector";
import CharacterPortrait from "@/components/CharacterPortrait";
import { getCharacterBioData, getCookie, getLatestCharacterBioData } from "@/lib/utilities";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { useState } from "react";

interface Props {
	character: Character
	chapters: Chapter[]
}

export default function Inner( { character, chapters }: Props ) {
	const [ currentChapter, setCurrentChapter ] = useState(
		getCookie('last-read-chapter') ?? chapters[0].slug
	);

	const characterData = getCharacterBioData( character );

	let { name, pronouns, description, portrait } = getLatestCharacterBioData(
		chapters,
		currentChapter,
		characterData
	);

	name = name ?? character.title.rendered;
	description = description ?? 'Read on to find out more about this character';

	return (
		<>
			<ChapterSelector
				chapters={ chapters }
				currentChapter={ currentChapter }
				setCurrentChapter={ setCurrentChapter }
			/>

			<div className="character-profile">
				<CharacterPortrait portrait={ portrait } characterName={ name } />
				<div>
					<h1>{ name }</h1>
					{ pronouns && <span className="pronouns">{ pronouns }</span> }
					<p>{ description }</p>
				</div>
			</div>
		</>
	)
}