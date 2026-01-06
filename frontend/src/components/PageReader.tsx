import { PageNumber } from "@/types/types";

import { notFound, redirect } from "next/navigation";
import '@/styles/page-reader.scss';
import { findPage, numeralisePageNumber } from "@/lib/utilities";
import { getComicPages } from "@/lib/data-fetching";
import PageReaderNav from "@/components/PageReaderNav";
import JsonLdSchema from "./JsonLdSchema";
import JumpToTop from "./JumpToTop";
import AuthorsNote from "./AuthorsNote";
import CharacterTags from "./CharacterTags";
import Background from "./Background";
import PageArea from "./PageArea";
import { getUser } from "@/lib/users";

interface Props {
	page?: PageNumber
}

export default async function PageReader( { page = 'latest' }: Props ) {
	const pages = await getComicPages();

	let pageNumber = await numeralisePageNumber( page );

	const pageData = findPage( pages, pageNumber );

	if ( ! pageData ) {
		notFound();
	}

	if ( pageData.locked_to_ids && pageData.locked_to_ids.length > 0 ) {
		const { roles } = await getUser();
		const rolesSet = new Set( roles );
		const locksSet = new Set( pageData.locked_to_ids );

		if ( rolesSet.intersection( locksSet ).size < 1 ) {
			redirect( `/login?redirectTo=/page/${ pageNumber }` );
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
