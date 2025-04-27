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

	console.log( 'url: ', url );

	return await fetch( url, options )
		.then( res => res.json() )
		.catch( e => console.error(e) )
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