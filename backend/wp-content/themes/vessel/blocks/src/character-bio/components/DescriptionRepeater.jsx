import { useState } from "react";
import DescriptionChapterSelector from "./DescriptionChapterSelector";
import Description from "./Description";

export default function DescriptionRepeater( { descriptions, setDescription } ) {
	const [ selectedChapter, setSelectedChapter ] = useState();

	return (
		<div className='descriptions'>
			<DescriptionChapterSelector
				selectedChapter={ selectedChapter }
				setSelectedChapter={ setSelectedChapter }
			/>

			<Description
				chapter={ selectedChapter }
				descriptions={ descriptions }
				setDescription={ setDescription }
			/>
		</div>
	);
}