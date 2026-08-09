import { Metadata } from 'next';
import { PageNumber } from '@/types/types';

import { notFound } from 'next/navigation'
import PageReader from '@/components/server/PageReader';
import { getComicPageMetadata } from '@/lib/utilities';


type Props = {
	params: Promise<{ number: PageNumber }>
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	let { number } = await params;

	return await getComicPageMetadata( number );
}

export default async function NumberedPage( { params }: Props ) {
	let { number } = await params;
	const validNonNumbers = [ 'latest' ];

	if ( isNaN( parseInt( number as string ) ) && ! validNonNumbers.includes( number as string ) ) {
		notFound();
	}

	return <PageReader page={ number } />;
}
