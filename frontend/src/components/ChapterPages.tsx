import { getUser } from "@/lib/users";
import { applyLockedAttribute } from "@/lib/utilities";
import { ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ElementType, ReactNode } from "react";
import LockIcon from "./LockIcon";


interface Props {
	chapter: Chapter
	pages: ComicPage[]
	headingLevel?: 1|2|3|4|5|6
}

export default async function ChapterPages( { chapter, pages, headingLevel = 2 }: Props ) {
	const user = await getUser();
	pages = applyLockedAttribute( user?.roles, pages );

	console.log( 'pages: ', pages );

	const HeadingTag = 'h' + headingLevel as ElementType;

	if ( pages.length < 1 ) {
		notFound();
	}

	return (
		<div className="chapter">
			<HeadingTag>{ chapter.name }</HeadingTag>
			<p>{ chapter.description }</p>
			{ pages.map( page => (
				<Link
					href={ `/page/${ page.meta.comic_page_number }` }
					key={ page.id }
					className='page-link'
				>
					{ page.locked &&
						<LockIcon width={ 25 } height={ 25 } />
					}
					{ page.title.rendered }
				</Link>
			) ) }
		</div>
	);
}