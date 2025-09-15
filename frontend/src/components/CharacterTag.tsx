import { getCharacterBioData, getLatestCharacterBioData, sendApiRequest } from "@/lib/utilities";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { WP_Term } from "wp-types";
import CharacterPortrait from "./CharacterPortrait";

interface Props {
	character: Character
	chapter: Chapter
}

export default async function CharacterTag( { character, chapter }: Props ) {
	const chapters = await sendApiRequest( 'GET', 'wp/v2/chapters' ) as Chapter[] ?? [];
	const allBioData = getCharacterBioData( character );
	const { name, portrait, description } = getLatestCharacterBioData( chapters, chapter.slug, allBioData );

	return (
		<div className="character-tag">
			<div className="character-tag-label">
				{ name ?? character.title.rendered }
			</div>
			<div className="character-tag-popup">
				<CharacterPortrait
					portrait={ portrait }
					characterName={ name ?? character.title.rendered }
					size={ 50 }
				/>
				<div>
					<h4>{ name ?? character.title.rendered }</h4>
					<span>
						{ description }
					</span>
				</div>
			</div>
		</div>
	);
}