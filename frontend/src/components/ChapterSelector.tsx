import { Dispatch, SetStateAction } from "react";
import { Chapter } from "@/types/wp-taxonomies";

interface Props {
	chapters: Chapter[]
	currentChapter: string
	setCurrentChapter: Dispatch<SetStateAction<string>>
}

export default function ChapterSelector( { chapters, currentChapter, setCurrentChapter }: Props ) {
	return (
		<div className="how-far">
			<h2>How far have you read?</h2>

			<div className="chapter-selector">
				<select value={ currentChapter } onChange={ ( e ) => {
					setCurrentChapter( e.target.value );
				} }>
					{ chapters.map( ( chapter ) => (
						<option value={ chapter.slug } key={ chapter.slug }>
							{ chapter.name }
						</option>
					) ) }
				</select>
			</div>
		</div>
	);
}