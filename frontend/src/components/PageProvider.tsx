import { PageNumber } from '@/types/types';

import { notFound } from 'next/navigation'
import { getPages } from '@/lib/utilities';
import PageReader from './PageReader';

interface Props {
	page?: PageNumber
}

export default async function PageProvider( { page = 'latest' }: Props ) {
	const pages = await getPages();

	page = page === 'latest' ? pages.length : page;
	page = typeof page !== 'number' ? parseInt( page ) : page;

	if ( ! pages[ page - 1 ] ) {
		notFound();
	}

	return <PageReader pages={ pages } page={ page } />;
}
