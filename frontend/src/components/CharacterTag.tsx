import { getCharacterBioData, getLatestCharacterBioData } from "@/lib/utilities";
import { getChapters } from "@/lib/data-fetching";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import CharacterPortrait from "./CharacterPortrait";
import Link from "next/link";

interface Props {
	character: Character
	chapter: Chapter
}

export default async function CharacterTag( { character, chapter }: Props ) {
	const chapters   = await getChapters() ?? [];
	const allBioData = getCharacterBioData( character );

	const { name, portrait, description } = getLatestCharacterBioData( chapters, chapter.slug, allBioData );

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
					<span>
						{ description }
					</span>
				</div>
			</div>
		</Link>
	);
}