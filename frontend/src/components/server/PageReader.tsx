import { ComicIndexWithLock, ComicReaderData } from "@/types/types";

import { notFound } from "next/navigation";
import '@/styles/page-reader.scss';
import { arraysHaveOverlap, getEmbeddedChapters,applyLockedAttribute, isLocked } from "@/lib/utilities";
import PageReaderNav from "@/components/server/PageReaderNav";
import JsonLdSchema from "./JsonLdSchema";
import JumpToTop from "../client/JumpToTop";
import AuthorsNote from "./AuthorsNote";
import CharacterTags from "./CharacterTags";
import Background from "./Background";
import PageArea from "./PageArea";
import Secret from "./Secret";
import SubscribeBanner from "../client/SubscribeBanner";
import SetPageCookies from "../client/SetPageCookies";
import { SessionProvider } from "next-auth/react";
import { User } from "next-auth";

type Props = {
	comicReaderData: ComicReaderData
	user: User & {roles: string[]}
}

/** 
 Core part of any page where you can read comic pages, including
 the page itself and the navigation
 */
export default async function PageReader( { comicReaderData, user }: Props ) {
	const {current, latest, indexes} = comicReaderData;

	if (!current || !latest || !indexes) {
		notFound();
	}

	const pageNumber = current.meta.comic_page_number;
	const indexesWithLock: ComicIndexWithLock[] = indexes.map(
		page => ( {
			...page,
			locked: isLocked( page, user )
		} )
	);

	const lockedLatest = {
		...latest,
		locked: isLocked( latest, user )
	};

	const latestPageNumber = latest.page_number;
	const pageData = applyLockedAttribute(user?.roles ?? [], [current])[0];

	if ( ! pageData ) {
		notFound();
	}

	const chapters = getEmbeddedChapters( pageData );

	let secret = null;

	if ( pageData.locked ) {
		if ( ! user ) {
			secret = <Secret redirectUrl={ `/page/${ pageNumber }` } />;
		} else if ( ! arraysHaveOverlap(
			user.roles,
			pageData.locked_to_ids
		) ) {
			secret = <Secret redirectUrl={ `/page/${ pageNumber }` } user={ user } />;
		}
	}

	const schema = pageData.yoast_head_json.schema;
	const { backgroundGradient, backgroundImage } = pageData.content_blocks[0].attrs;

	const canGoBack = pageNumber > 1;
	const canGoForward = pageNumber < latestPageNumber;

	return (
		<SessionProvider>
			<SetPageCookies chapter={chapters[0].slug} />
			{ !user && <SubscribeBanner /> }
			<JsonLdSchema schema={ schema } />
			<main className={`page-reader ${ pageData.class_list.join(' ') }`}>
				<Background backgroundGradient={ backgroundGradient } backgroundImage={ backgroundImage } />
				<JumpToTop />
				<PageReaderNav currentPageNumber={pageNumber} pageIndexes={indexesWithLock} latest={lockedLatest} />
				{ secret && secret }
				{ ! secret &&
					<PageArea
						pageData={ pageData }
						pageNumber={ pageNumber }
						canGoBack={ canGoBack }
						canGoForward={ canGoForward }
					/>
				}
				<PageReaderNav currentPageNumber={pageNumber} pageIndexes={indexesWithLock} latest={lockedLatest} />
				{ ! secret &&
					<>
						<CharacterTags
							characters={ pageData.content_blocks[0].attrs.characters }
							chapter={ chapters[0].slug }
						/>
						<AuthorsNote page={ pageData } />
					</>
				}
			</main>
		</SessionProvider>
	)
}
