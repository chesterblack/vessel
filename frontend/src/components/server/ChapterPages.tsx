import { getUser } from "@/lib/users";
import { applyLockedAttribute, getImageProps } from "@/lib/utilities";
import { ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import LockIcon from "./svg/LockIcon";
import Button from "./Button";
import { HeadingLevel } from "@/types/types";
import Heading from "@/components/server/Heading";
import Image from "next/image";


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
			<Heading level={ headingLevel } id={ chapter.slug }>
				{ chapter.name }
			</Heading>
			<p>{ chapter.description }</p>

			<div className="archive-pages">
				{ pages.map( page => {
					const {src, width, height, alt} = getImageProps( page );
					const date = new Date( page.date );

					return (
						<Button
							href={`/page/${page.meta.comic_page_number}`}
							key={page.id}
							classes='page-link'
						>
							<div className={`preview-image-container ${page.locked ? 'preview-image-container--locked' : ''}`}>
								{page.locked && <LockIcon width={25} height={25} />}
								<Image
									className={`preview-image`}
									src={ src }
									width={ width }
									height={ height }
									alt={ alt }
									priority={ true }
									fetchPriority='high'
								/>
							</div>
							<div className="date">{ `${ date.toDateString() }` }</div>
							{page.title.rendered}
						</Button>
					);
				} ) }
			</div>
		</div>
	);
}