import { getUser } from "@/lib/users";
import { applyLockedAttribute } from "@/lib/utilities";
import { ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import LockIcon from "./svg/LockIcon";
import Button from "./Button";
import { HeadingLevel } from "@/types/types";
import Heading from "@/components/server/Heading";


type Props = {
	chapter: Chapter
	pages: ComicPage[]
	headingLevel?: HeadingLevel
}

/**
 * Creates a list of links to every comic page in a chapter, along with the chapter name as a title and the chapter description if it exists.
 */
export default async function ChapterPages( { chapter, pages, headingLevel = 2 }: Props ) {
	const user = await getUser();
	pages = applyLockedAttribute( user?.roles, pages );

	if ( pages.length < 1 ) {
		return null;
	}

	return (
		<div className="chapter">
			<Heading level={ headingLevel }>
				{ chapter.name }
			</Heading>
			<p>{ chapter.description }</p>

			{ pages.map( page => (
				<Button
					href={ `/page/${ page.meta.comic_page_number }` }
					key={ page.id }
					classes='page-link'
				>
					{ page.locked && <LockIcon width={ 25 } height={ 25 } /> }
					{ page.title.rendered }
				</Button>
			) ) }
		</div>
	);
}