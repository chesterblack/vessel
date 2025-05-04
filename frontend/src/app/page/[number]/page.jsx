import { notFound } from 'next/navigation'
import HomePage from "@/app/page";

export default async function NumberedPage( { params } ) {
	let { number } = await params;
	const validNonNumbers = [ 'latest' ];

	if ( isNaN( number ) && ! validNonNumbers.includes( number ) ) {
		notFound();
	}

	if ( ! isNaN( number ) ) {
		number = parseInt( number );
	}
	
	console.log( 'number: ', number );

	return <HomePage pageNumber={ number } />;
}