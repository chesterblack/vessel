import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Chapter } from "@/types/wp-taxonomies";
import { setCookie } from "@/lib/utilities";

interface Props {
	chapters: Chapter[]
	currentChapter: string
	selectCallback: Dispatch<SetStateAction<string>>
}

/**
 * Renders the chapter select dropdown and calls selectCallback on change. Parent controls the state.
 */
export default function ChapterSelector( { chapters, currentChapter, selectCallback }: Props ) {
	function onChange( e: ChangeEvent<HTMLSelectElement> ) {
		setCookie( 'last-read-chapter', e.target.value );
		selectCallback( e.target.value );
	}

	return (
		<div className="how-far">
			<h2>How far have you read?</h2>

			<div className="chapter-selector">
				<select value={ currentChapter } onChange={ onChange }>
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