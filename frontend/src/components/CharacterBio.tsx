import { Character } from "@/types/wp-post-types";

import Link from "next/link";
import parse from 'html-react-parser';
import CharacterPortrait from "./CharacterPortrait";

interface Props {
	characterData: Character
	characterDescription: string
}

export default function CharacterBio( { characterData, characterDescription }: Props ) {
	if ( ! characterData ) {
		return;
	}

	const description = parse( characterDescription );

	return (
		<div className="character-bio">
			<Link href={ `/characters/${ characterData.slug }` }>
				<CharacterPortrait character={ characterData } />
			</Link>
			<div>
				<h2>
					<Link href={ `/characters/${ characterData.slug }` }>
						{ characterData.title.rendered }
					</Link>
				</h2>
				<p>{ description }</p>
			</div>
		</div>
	);
}