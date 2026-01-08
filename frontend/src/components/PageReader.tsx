import { PageNumber } from "@/types/types";

import { notFound } from "next/navigation";
import '@/styles/page-reader.scss';
import { arraysHaveOverlap, findPage, numeralisePageNumber, removeLockedPosts } from "@/lib/utilities";
import { getComicPages } from "@/lib/data-fetching";
import PageReaderNav from "@/components/PageReaderNav";
import JsonLdSchema from "./JsonLdSchema";
import JumpToTop from "./JumpToTop";
import AuthorsNote from "./AuthorsNote";
import CharacterTags from "./CharacterTags";
import Background from "./Background";
import PageArea from "./PageArea";
import { getUser } from "@/lib/users";
import Secret from "./Secret";

interface Props {
	page?: PageNumber
}

export default async function PageReader( { page = 'latest' }: Props ) {
	const user = await getUser();
	const pages = await getComicPages( user?.roles );
	const unlockedPages = removeLockedPosts( pages );
	const pageNumber = await numeralisePageNumber( page, unlockedPages );
	const pageData = findPage( pages, pageNumber );

	if ( ! pageData ) {
		notFound();
	}

	if ( pageData.locked ) {
		const user = await getUser();

		if ( ! user ) {
			return (
				<Secret redirectUrl={ `/page/${ pageNumber }` } />
			);
		}

		if ( ! arraysHaveOverlap(
			user.roles,
			pageData.locked_to_ids
		) ) {
			return (
				<Secret redirectUrl={ `/page/${ pageNumber }` } user={ user } />
			)
		}
	}

	const schema = pageData.yoast_head_json.schema;

	const { backgroundGradient, backgroundImage } = pageData.content_blocks[0].attrs;

	const canGoBack = pageNumber > 1;
	const canGoForward = pageNumber < pages.length;

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<main className={`page-reader ${ pageData.class_list.join(' ') }`}>
				<Background backgroundGradient={ backgroundGradient } backgroundImage={ backgroundImage } />
				<JumpToTop />
				<PageReaderNav pages={ pages } page={ pageNumber } />
				<PageArea
					pageData={ pageData }
					pageNumber={ pageNumber }
					canGoBack={ canGoBack }
					canGoForward={ canGoForward }
				/>
				<PageReaderNav pages={ pages } page={ pageNumber } />
				<CharacterTags
					characters={ pageData.content_blocks[0].attrs.characters }
					pageData={ pageData }
				/>
				<AuthorsNote page={ pageData } />
			</main>
		</>
	)
}
