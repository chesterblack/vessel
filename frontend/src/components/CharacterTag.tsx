import { getCharacterBioData, getLatestCharacterBioData } from "@/lib/utilities";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import CharacterPortrait from "./CharacterPortrait";
import Link from "next/link";

interface Props {
	character: Character
	chapter: string
	chapterData: Chapter[]
}

export default function CharacterTag( { character, chapter, chapterData }: Props ) {
	const allBioData = getCharacterBioData( character );

	const { name, portrait, description, pronouns } = getLatestCharacterBioData( chapterData, chapter, allBioData );;

	if ( ! description ) {
		return;
	}

	return (
		<Link href={ `/characters/${ character.slug }` } className="character-tag">
			<div className="character-tag-label">
				{ name ?? character.title.rendered }
			</div>
			<div className="character-tag-popup">
				{
					portrait &&
					<CharacterPortrait
						portrait={ portrait }
						characterName={ name ?? character.title.rendered }
						size={ 50 }
					/>
				}
				<div>
					<h4>{ name ?? character.title.rendered }</h4>
					{ pronouns && <span className="pronouns">{ pronouns }</span> }
					<span>
						{ description }
					</span>
				</div>
			</div>
		</Link>
	);
}