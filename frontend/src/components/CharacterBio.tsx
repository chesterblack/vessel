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
		<Link href={ `/characters/${ characterData.slug }` } className="character-bio">
			<CharacterPortrait character={ characterData } />
			<div>
				<h2>{ characterData.title.rendered }</h2>
				<p>{ description }</p>
			</div>
		</Link>
	);
}