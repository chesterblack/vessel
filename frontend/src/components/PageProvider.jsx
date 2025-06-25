import { getPages } from '@/lib/utilities';
import PageReader from './PageReader';

export default async function PageProvider( { startingPage = 'latest' } ) {
	const pages = await getPages();

	startingPage = startingPage === 'latest' ? pages.length : startingPage;

	return (
		<PageReader pages={ pages } startingPage={ startingPage } />
	);
}