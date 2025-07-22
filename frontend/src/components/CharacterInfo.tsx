'use client'

import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import CharacterDescription from "./CharacterDescription";
import CharacterPortrait from "./CharacterPortrait";


interface Props {
	character: Character
	chapters: Chapter[]
}

export default function CharacterInfo( { character, chapters }: Props ) {
	const descriptions = character.content_blocks[0].attrs.descriptions;

	const descriptionElements = [];
	chapters.forEach( chapter => {
		if ( descriptions[ chapter.slug ] ) {
			descriptionElements.push(
				<CharacterDescription
					description={ descriptions[ chapter.slug ] }
					descriptionChapter={ chapter }
					chapters={ chapters }
					key={ chapter.id }
				/>
			);
		}
	} );
	
	return (
		<div className="single-character">
			<CharacterPortrait character={ character } />
			<div className="character-descriptions">
				{ descriptionElements }
			</div>
		</div>
	);
}