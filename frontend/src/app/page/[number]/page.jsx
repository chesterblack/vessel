import { notFound } from 'next/navigation'
import PageReader from '@/components/PageReader';

export default async function NumberedPage( { params } ) {
	let { number } = await params;
	const validNonNumbers = [ 'latest' ];

	if ( isNaN( number ) && ! validNonNumbers.includes( number ) ) {
		notFound();
	}

	if ( ! isNaN( number ) ) {
		number = parseInt( number );
	}

	return <PageReader pageNumber={ number } />;
}
