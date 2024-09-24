import Link from 'next/link';

export default function ArchiveChapter({ chapter }) {
	let pages = [];

	chapter.pages.forEach((page) => {
		pages.push(
			<Link
				key={page.fields.pageName}
				href={`/read/${page.fields.position}`}
			>
				{page.fields.pageName}
			</Link>
		);
	});

	return (
		<div className="chapter-container">
			<h2>{chapter.chapterName}</h2>
			{pages}
		</div>
	);
}
