import { Dispatch, SetStateAction } from "react";
import { WP_REST_API_Chapter } from "@/types/wp-taxonomies";

interface Props {
	chapters: WP_REST_API_Chapter[]
	currentChapter: string
	setCurrentChapter: Dispatch<SetStateAction<string>>
}

export default function ChapterSelector( { chapters, currentChapter, setCurrentChapter }: Props ) {
	console.log( 'chapters: ', chapters );

	return (
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
	);
}