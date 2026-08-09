import { Character } from "@/types/wp-post-types";
import parse from 'html-react-parser';
import CharacterPortrait from "./CharacterPortrait";
import { getCharacterBioData, getLatestCharacterBioData } from "@/lib/utilities";
import { Chapter } from "@/types/wp-taxonomies";
import Heading from "./Heading";
import { HeadingLevel } from "@/types/types";


type Props = {
	character: Character
	chapters: Chapter[]
	currentChapter: string
	headingLevel?: HeadingLevel
}

/**
 * A bio (name, picture, description) of a single given character during the given chapter.
 */
export default function CharacterBio( { character, chapters, currentChapter, headingLevel = 1 }: Props ) {
	const characterBlockData = getCharacterBioData( character );

	const characterBio = getLatestCharacterBioData(
		chapters,
		currentChapter,
		characterBlockData
	);

	if ( ! characterBio.description ) { return null }

	const { portrait, name, description, pronouns } = characterBio;

	const parsedDescription = parse( description ?? description ?? 'Read on to find out more about this character' );

	return (
		<>
			<CharacterPortrait
				portrait={ portrait }
				characterName={ name ? name : character.title.rendered }
			/>
			<div>
				<Heading level={ headingLevel }>
					{ name ? name : character.title.rendered }
				</Heading>
				{ pronouns && <span className="pronouns">{ pronouns }</span> }
				<p>{ parsedDescription }</p>
			</div>
		</>
	);
}