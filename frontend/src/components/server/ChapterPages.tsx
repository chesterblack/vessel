import { applyLockedAttribute, getImageProps } from "@/lib/utilities";
import { ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import LockIcon from "./svg/LockIcon";
import Button from "./Button";
import { HeadingLevel, UserWithRoles } from "@/types/types";
import Heading from "@/components/server/Heading";
import Image from "next/image";
import { ElementType } from "react";


type Props = {
	chapter: Chapter
	pages: ComicPage[]
	user: UserWithRoles
	headingLevel?: HeadingLevel
	accordion?: boolean
}

/**
 * Creates a list of links to every comic page in a chapter, along with the chapter name as a title and the chapter description if it exists.
 */
export default function ChapterPages( { chapter, pages, user, headingLevel = 2, accordion = false }: Props ) {
	pages = applyLockedAttribute( user?.roles, pages );

	if ( pages.length < 1 ) {
		return null;
	}

	const WrapperTag = accordion ? 'details' : 'div' as ElementType;
	const heading = <Heading level={ headingLevel } id={ chapter.slug }>{ chapter.name }</Heading>;

	return (
		<WrapperTag className="chapter">
			{ accordion &&
				<summary>
					{ heading }
				</summary>
			}
			{ !accordion && heading }
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
		</WrapperTag>
	);
}