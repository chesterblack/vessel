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
	const { portrait, name, description } = characterBio;

	const parsedDescription = parse( description ?? '' );

	return (
		<div className="character-bio">
			<Link href={ `/characters/${ character.slug }` }>
				<CharacterPortrait
					portrait={ portrait }
					characterName={ name ? name : character.title.rendered }
				/>
			</Link>
			<div>
				<h2>
					<Link href={ `/characters/${ character.slug }` }>
						{ name ? name : character.title.rendered }
					</Link>
				</h2>
				<p>{ parsedDescription }</p>
			</div>
		</div>
	);
}