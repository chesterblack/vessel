import { getChapterPages } from '@/lib/utilities';
import ChapterPages from '@/components/server/ChapterPages';
import { getChapter } from '@/lib/data-fetching';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/users';

export default async function SingleChapterPage( { params } ) {
	const { slug } = await params;
	const chapter  = await getChapter( slug );
	const user     = await getUser();

	if ( ! chapter ) {
		notFound();
	}

	const pages = await getChapterPages( chapter );

	return (
		<main className='single-chapter'>
			<ChapterPages chapter={ chapter } pages={ pages } user={ user }  headingLevel={ 1 } />
		</main>
	);
}