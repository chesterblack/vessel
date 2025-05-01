'use client'

import { useState } from "react";
import { useEffect } from "react";
import { sendApiRequest } from "@/lib/utilities";
import { ComicContext } from "@/context/comic-context";
import PageReader from "@/components/PageReader";

export default function HomePage( { pageNumber = 1 } ) {
	const [ currentPage, setCurrentPage ] = useState();
	const [ currentPageNumber, setCurrentPageNumber ] = useState( pageNumber );
	const [ pages, setPages ] = useState([]);

	useEffect( () => {
		( async () => {
			const urlParams = {
				status: 'publish',
				order: 'asc',
				_fields: [
					'id',
					'date',
					'title',
					'slug',
					'content',
					'content_blocks',
				]
			}
			const pageData = await sendApiRequest( 'GET', 'wp/v2/comic_page', urlParams );

			if ( ! pageData ) {
				return;
			}

			setPages( pageData );
			setCurrentPage( pages[ parseInt( currentPageNumber ) - 1 ] );
		} )();
	}, [] );

	useEffect( () => {
		if ( pages ) {
			window.history.replaceState( null, '', `/page/${ currentPageNumber }` );
			setCurrentPage( pages[ parseInt( currentPageNumber ) - 1 ] );
		}
	}, [ currentPageNumber, pages ] )

	return (
		<ComicContext.Provider value={ {
			pages, setPages,
			currentPage, setCurrentPage,
			currentPageNumber, setCurrentPageNumber
		} }>
			<PageReader />
		</ComicContext.Provider>
	)
}
