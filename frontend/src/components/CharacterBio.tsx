import { Character } from "@/types/wp-post-types";

import Link from "next/link";
import parse from 'html-react-parser';
import CharacterPortrait from "./CharacterPortrait";
import { CharacterBioDatum } from "@/types/wp-blocks";

interface Props {
	character: Character
	characterBio: CharacterBioDatum
}

export default function CharacterBio( { character, characterBio }: Props ) {
	const { portrait, name, description, pronouns } = characterBio;

	const parsedDescription = parse( description ?? '' );

	return (
		<Link className="character-bio" href={ `/characters/${ character.slug }` }>
			<CharacterPortrait
				portrait={ portrait }
				characterName={ name ? name : character.title.rendered }
			/>
			<div>
				<h2>{ name ? name : character.title.rendered }</h2>
				{ pronouns && <span className="pronouns">{ pronouns }</span> }
				<p>{ parsedDescription }</p>
			</div>
		</Link>
	);
}