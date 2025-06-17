'use client'

import '@/styles/page-reader.scss';

import { useState, useEffect } from "react";
import Image from "next/image";

import { sendApiRequest } from "@/lib/utilities";
import { ComicContext } from "@/context/comic-context";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function PageReader( { pageNumber = 'latest' } ) {
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

	const attrs = currentPage?.content_blocks?.[0]?.attrs;
	let alt = '';
	let image;
	if ( attrs ) {
		alt = attrs.pageImage?.alt ?? '';
		image = attrs.pageImage?.sizes?.comic_page_desktop ?? attrs.pageImage;
	}

	return (
		<ComicContext.Provider value={ {
			pages, setPages,
			currentPage, setCurrentPage,
			currentPageNumber, setCurrentPageNumber
		} }>
			<main className='page-reader'>
				<PageReaderNav />
				{
					image ?
						<Image
							src={ image.url }
							width={ image.width }
							height={ image.height }
							alt={ image.alt }
							className="page-image"
							priority={ true }
						/> :
						<PlaceholderPage />
					}
				<PageReaderNav />
			</main>
		</ComicContext.Provider>
	)
}
