import Link from "next/link";

import '@/styles/archive.scss';
import { sendApiRequest, sortByAttribute } from "@/lib/utilities";

export default async function ArchivePage() {
	const chapters = await sendApiRequest( 'GET', 'wp/v2/chapters' ) ?? [];

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

	return (
		<main className="archive">
			<h1>Archive</h1>
			{ pageData.map( section => {
				if ( ! section.pages.length > 0 ) {
					return;
				}

				return (
					<div className="chapter" key={ section.chapter.id }>
						<h2>{ section.chapter.name }</h2>
						<p>{ section.chapter.description }</p>
						{ section.pages.map( page => (
							<Link
								href={ `/page/${ page.content_blocks[0].attrs.pageNumber ?? '' }` }
								key={ page.id }
								className='page-link'
							>
								{ page.title.rendered }
							</Link>
						) ) }
					</div>
				);
			} ) }
		</main>
	);
}