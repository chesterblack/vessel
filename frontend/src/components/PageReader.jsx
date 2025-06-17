'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

import '@/styles/page-reader.scss';
import { ComicContext } from "@/context/comic-context";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";


export default function PageReader( { pages, startingPage = 'latest' } ) {
	startingPage = startingPage === 'latest' ? pages.length : startingPage;
	const pageIndex = pages.findIndex( page => page.meta.comic_page_number === startingPage );

	const [ currentPage, setCurrentPage ] = useState( pages[ pageIndex ] );
	const [ currentPageNumber, setCurrentPageNumber ] = useState( startingPage );

	console.log( 'currentPage: ', currentPage );

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
			pages,
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
