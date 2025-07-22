import { ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import Link from "next/link";
import { notFound } from "next/navigation";


interface Props {
	chapter: Chapter
	pages: ComicPage[]
	headingLevel?: 1|2|3|4|5|6
}

export default function ChapterPages( { chapter, pages, headingLevel = 2 }: Props ) {
	const HeadingTag = 'h' + headingLevel as any;

	if ( pages.length < 1 ) {
		notFound();
	}
	return (
		<div className="chapter">
			<HeadingTag>{ chapter.name }</HeadingTag>
			<p>{ chapter.description }</p>
			{ pages.map( page => (
				<Link
					href={ `/page/${ page.content_blocks[0].attrs.pageNumber }` }
					key={ page.id }
					className='page-link'
				>
					{ page.title.rendered }
				</Link>
			) ) }
		</div>
	);
}