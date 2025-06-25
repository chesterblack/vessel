import { Metadata } from 'next';
import { PageNumber } from '@/types/types';

import { notFound } from 'next/navigation'
import PageProvider from '@/components/PageProvider';


interface Props {
	params: Promise<{ number: PageNumber }>
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	let { number } = await params;

	let title = `Page ${ number } | Vessel`;
	if ( number === 'latest' ) {
		title = `Latest | Vessel`;
	}

	return { title, description: '...' }
}

export default async function NumberedPage( { params }: Props ) {
	let { number } = await params;
	const validNonNumbers = [ 'latest' ];

	if ( isNaN( parseInt( number as string ) ) && ! validNonNumbers.includes( number as string ) ) {
		notFound();
	}

	if ( typeof number !== 'number' ) {
		number = parseInt( number );
	}

	return <PageProvider page={ number } />;
}
