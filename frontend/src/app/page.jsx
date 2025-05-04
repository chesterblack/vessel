'use client'

import { useState } from "react";
import { useEffect } from "react";
import { sendApiRequest, sortByAttribute } from "@/lib/utilities";
import { ComicContext } from "@/context/comic-context";
import PageReader from "@/components/PageReader";

export default function HomePage( { pageNumber = 'latest' } ) {
	const [ currentPage, setCurrentPage ] = useState();
	const [ currentPageNumber, setCurrentPageNumber ] = useState( pageNumber );
	const [ pages, setPages ] = useState([]);

	useEffect( () => {
		( async () => {
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
			let pageData = await sendApiRequest( 'GET', 'wp/v2/comic_page', urlParams );

			if ( ! pageData ) {
				return;
			}

			if ( currentPageNumber === 'latest' ) {
				setCurrentPageNumber( pageData[0].meta.comic_page_number );
			}

			const pageIndex = pageData.findIndex( page => page.meta.comic_page_number === currentPageNumber );

			setPages( pageData );
			setCurrentPage( pageData[ pageIndex ] );
		} )();
	}, [] );

	useEffect( () => {
		if ( pages ) {
			window.history.replaceState( null, '', `/page/${ currentPageNumber }` );

			const pageIndex = pages.findIndex( page => page.meta.comic_page_number === currentPageNumber );
			setCurrentPage( pages[ pageIndex ] );
		}
	}, [ currentPageNumber ] );

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
