import { Chapter } from "@/types/wp-taxonomies";

import { useState } from "react";
import parse from 'html-react-parser';
import Button from "./Button";


interface Props {
	description: string
	chapters: Chapter[]
	descriptionChapter: Chapter
	startingVisibility?: boolean
}

export default function CharacterDescription( { description, descriptionChapter, startingVisibility = false }: Props ) {
	const [ visible, setVisible ] = useState( startingVisibility );

	return (
		<div className={ `character-description ${ visible ? '' : 'hidden' }` }>
			<h3>{ descriptionChapter.name }</h3>
			<p>{ parse( description ) }</p>
			<Button
				onClick={ () => setVisible( true ) }
				classes='reveal-button unblur'
			>
				<h4>
					View { descriptionChapter.name } Spoilers
				</h4>
			</Button>
		</div>
	);
}