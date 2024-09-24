import { useState, useEffect } from 'react';

import Title from '../components/Title';
import ArchiveChapter from '../components/ArchiveChapter';

import { getChapters } from '../lib/contentful';

export default function ArchivePage() {
	const [chapters, setChapters] = useState(false);

	useEffect(() => {
		(async () => {
			let chapters = await getChapters();
			setChapters(chapters);
		})()
	}, []);

	return (
		<>
			<Title>Archive</Title>
			<div className="archive-container">
				{(() => {
					if (chapters) {
						let allChapters = [];

						chapters.forEach((chapter) => {
							allChapters.push(
								<ArchiveChapter chapter={chapter} />
							);
						});

						return allChapters;
					}
				})()}
			</div>
		</>
	);
}
