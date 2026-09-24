import { getCharacterBioData, getLatestCharacterBioData } from "@/lib/utilities";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import Link from "next/link";
import CharacterBio from "./CharacterBio";

type Props = {
	character: Character
	chapter: string
	chapterData: Chapter[]
}

/** A single character tag, specified to the given chapter. This links off to the character page and also includes a hidden popup that shows on hover */
export default function CharacterTag( { character, chapter, chapterData }: Props ) {
	const allBioData = getCharacterBioData( character );

	const { name } = getLatestCharacterBioData( chapterData, chapter, allBioData );

	return (
		<Link href={ `/characters/${ character.slug }` } className="character-tag">
			<div className="character-tag-label">
				{ name ?? character.title.rendered }
			</div>
			<div className="character-tag-popup">
				<CharacterBio
					character={ character }
					chapters={ chapterData }
					currentChapter={ chapter }
					headingLevel={ 4 }
				/>
			</div>
		</Link>
	);
}