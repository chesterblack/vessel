import '@/styles/archive.scss';
import { getChapterPages } from '@/lib/utilities';
import ChapterPages from '@/components/server/ChapterPages';
import { getChapter } from '@/lib/data-fetching';
import { notFound } from 'next/navigation';

export default async function SingleChapterPage( { params } ) {
	const { slug } = await params;
	const chapter  = await getChapter( slug );

	if ( ! chapter ) {
		notFound();
	}

	const pages = await getChapterPages( chapter );

	return (
		<main className='single-chapter'>
			<ChapterPages chapter={ chapter } pages={ pages } headingLevel={ 1 } />
		</main>
	);
}