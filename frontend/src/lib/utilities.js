/**
 * Send a request to this site's API
 * 
 * @param { string } method
 * @param { string } endpoint
 * @param { Object } [ urlParams ]
 * @param { Object } [ body ]
 * @param { Object } [ options ]
 * @returns { NextResponse }
 */
export async function sendApiRequest(
	method,
	endpoint,
	urlParams = null,
	body = null,
	options = {}
) {
	urlParams = urlParams ? new URLSearchParams( urlParams ) : '';

	options = {
		cache: "no-store",
		method,
		...options
	};

	if ( [ 'POST', 'PATCH' ].includes( method ) && body ) {
		options.body = JSON.stringify( body );
	}

	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/${ endpoint }?${ urlParams }`;

	return await fetch( url, options )
		.then( res => res.json() )
		.catch( e => null );
}

/**
 * Returns the latest description up to a certain chapter
 *
 * @param { [ Object ] } chapters Array of chapter objects as from the API
 * @param { string } currentChapter Current chapter slug
 * @param { [ string ] } descriptions Array of strings
 *
 * @returns { string }
 */
export function getLatestDescription( chapters, currentChapter, descriptions ) {
	if ( descriptions?.[ currentChapter ] ) {
		return descriptions[ currentChapter ];
	}
	
	const chapterSlugs = chapters.map( c => c.slug );

	let description = 'More information about this character will be revealed in time...';

	for (let i = 0; i < chapterSlugs.length; i++) {
		const slug = chapterSlugs[i];
		if ( slug === currentChapter ) {
			break;
		}

		if ( descriptions?.[ slug ] ) {
			description = descriptions[ slug ];
		}
	}

	return description;
}

/**
 * Sort an array of objects or arrays by one of it's attributes
 *
 * @param { Array } array The array of objects to sort, a copy will be returned
 * @param { string|int } attribute The attribute to sort by
 * @param { boolean } ascending Sort in ascending or descending order
 *
 * @returns { Array }
 */
export function sortByAttribute( array, attribute, ascending = true ) {
	const newArray = [ ...array ];
	newArray.sort( ( a, b ) => {
		if ( a?.[ attribute ] < b?.[ attribute ] ){
			return ascending ? -1 : 1;
		}

		if ( a?.[ attribute ] > b?.[ attribute ] ){
			return ascending ? 1 : -1;
		}

		return 0;
	} );

	return newArray;
}