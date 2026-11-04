'use client'

import { Character } from "@/types/wp-post-types";
import useCharacterAppearances from "@/hooks/useCharacterAppearances";
import { ChapterPageData, UserWithRoles } from "@/types/types";
import ChapterPages from "../server/ChapterPages";

type Props = {
	character: Character
	user: UserWithRoles
	chapter: string
}

export default function CharacterAppearances( { character, user, chapter }: Props ) {
	const { isLoading, pageData } = useCharacterAppearances( character );

	if ( isLoading ) {
		return "Loading...";
	}

	const currentChapterIndex = pageData.findIndex( chapterData => chapterData.chapter.slug === chapter );
	const upToDatePages = pageData.slice( 0, currentChapterIndex + 1 );
	const hasAnyPages = upToDatePages.some( ch => ch.pages.length );

	return (
		<div>
			{ hasAnyPages &&
				<h2>Appearances so far</h2>
			}
			{ upToDatePages.map( ( { chapter, pages } ) => {
				return pages.length ?
					<ChapterPages
						pages={ pages }
						chapter={ chapter }
						user={ user }
						key={ chapter.id }
						headingLevel={ 3 }
						accordion={ true }
					/> : null;
			} ) }
		</div>
	);
}