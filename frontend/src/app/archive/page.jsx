"use client"

import { useEffect, useState } from "react";
import { sendApiRequest, sortByAttribute } from "@/lib/utilities";
import Link from "next/link";

export default function ArchivePage() {
	const [ sections, setSections ] = useState([]);

	useEffect( () => {
		( async () => {
			const chapters = await sendApiRequest( 'GET', 'wp/v2/chapters' );

			let pageData = [];
			for ( let i = 0; i < chapters.length; i++ ) {
				const chapter = chapters[i];

				let chapterPages = await sendApiRequest(
					'GET',
					'wp/v2/comic_page',
					{ chapters: chapter.id }
				);

				chapterPages = chapterPages.map( chapterPage => ( {
					...chapterPage,
					pageNumber: chapterPage.content_blocks[0].attrs.pageNumber
				} ) );

				chapterPages = sortByAttribute( chapterPages, 'pageNumber' );

				pageData.push( {
					chapter: chapter,
					pages: chapterPages
				} );
			}

			setSections( pageData );
		} )();
	}, [] );

	return (
		<main className="archive">
			<h1>Archive</h1>
			{ sections.map( section => (
				<div className="archive__chapter" key={ section.chapter.id }>
					<h2>{ section.chapter.name }</h2>
					{ section.pages.map( page => (
						<Link
							href={ `/page/${ page.content_blocks[0].attrs.pageNumber ?? '' }` }
							key={ page.id }
						>
							{ page.title.rendered }
						</Link>
					) ) }
				</div>
			) ) }
		</main>
	);
}