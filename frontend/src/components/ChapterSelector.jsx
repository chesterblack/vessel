export default function ChapterSelector( { chapters, currentChapter, setCurrentChapter } ) {
	return (
		<div className="chapter-selector">
			<select value={ currentChapter } onChange={ ( e ) => {
				setCurrentChapter( e.target.value );
			} }>
				{ chapters.map( ( chapter ) => (
					<option value={ chapter.slug } key={ chapter.id }>
						{ chapter.name }
					</option>
				) ) }
			</select>
		</div>
	);
}