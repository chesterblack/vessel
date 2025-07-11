import { Chapter } from '@/types/wp-taxonomies';

import '@/styles/archive.scss';
import { getChapterPages, sendApiRequest } from '@/lib/utilities';
import ChapterPages from '@/components/ChapterPages';

export default async function SingleChapterPage( { params } ) {
	const { slug } = await params;

	const chapter = await sendApiRequest(
		'GET',
		'wp/v2/chapters',
		{ slug: slug }
	).then( d => d[0] ) as Chapter;

	const pages = await getChapterPages( chapter );

	return (
		<main className='single-chapter'>
			<ChapterPages chapter={ chapter } pages={ pages } headingLevel={ 1 } />
		</main>
	);
}