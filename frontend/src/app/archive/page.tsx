import { Metadata } from "next";
import { Chapter } from "@/types/wp-taxonomies";
import { ComicPage } from "@/types/wp-post-types";

import '@/styles/archive.scss';
import { getChapterPages } from "@/lib/utilities";
import { getChapters } from "@/lib/data-fetching";
import ChapterPages from "@/components/server/ChapterPages";
import Link from "next/link";


export const metadata: Metadata = {
	title: 'View all comic pages here',
	description: '...'
}

export default async function ArchivePage() {
	const chapters = await getChapters() ?? [];

	let pageData: {
		chapter: Chapter,
		pages: ComicPage[]
	}[] = [];

	for ( let i = 0; i < chapters.length; i++ ) {
		const chapter = chapters[i];

		const chapterPages = await getChapterPages( chapter );

		pageData.push( {
			chapter: chapter,
			pages: chapterPages
		} );
	}

	return (
		<main className="archive">
			<h1>Archive</h1>
			<p>
				Use the buttons below to quickly jump to a particular chapter.
			</p>
			<nav>
				{ pageData.map( ( { pages, chapter } ) => {
					return (
						<Link className="chapter-link" href={`#${chapter.slug}`} key={chapter.slug}>
							{chapter.name}
						</Link>
					);
				} ) }
			</nav>
			{ pageData.map( ( { pages, chapter } ) => {
				if ( pages.length < 1 ) {
					return;
				}

				return <ChapterPages pages={ pages } chapter={ chapter } key={ chapter.id } />;
			} ) }
		</main>
	);
}