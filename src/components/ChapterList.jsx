import ChapterOption from './ChapterOption';

export default function ChapterList({
	chapters,
	currentlyReadChapter,
	setCurrentlyReadChapter,
}) {
	let inner = [];
	chapters.forEach((chapter) => {
		let selected = false;
		if (chapter.id === currentlyReadChapter) {
			selected = true;
		}
		inner.push(<ChapterOption chapter={chapter} selected={selected} />);
	});

	return (
		<select
			onChange={(event) => {
				setCurrentlyReadChapter(event.target.value);
			}}
			className="cast-chapter-select"
		>
			{inner}
		</select>
	);
}
