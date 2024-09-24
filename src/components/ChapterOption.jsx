export default function ChapterOption({ chapter, selected }) {
	return (
		<option value={chapter.id} selected={selected}>
			{chapter.chapterName}
		</option>
	);
}
