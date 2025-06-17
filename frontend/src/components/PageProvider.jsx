import { sendApiRequest } from '@/lib/utilities';
import PageReader from './PageReader';

export default async function PageProvider( { startingPage = 'latest' } ) {
	const urlParams = {
		status: 'publish',
		order: 'desc',
		orderby: 'comic_page_number',
		per_page: 100,
		_fields: [
			'id',
			'date',
			'title',
			'slug',
			'content',
			'content_blocks',
			'meta',
		],
	};

	const pages = await sendApiRequest( 'GET', 'wp/v2/comic_page', urlParams );

	return (
		<PageReader pages={ pages } startingPage={ startingPage } />
	);
}