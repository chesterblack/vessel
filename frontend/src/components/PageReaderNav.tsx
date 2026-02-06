import { ComicPage } from "@/types/wp-post-types";

import Button from "./Button";
import PageSelector from "./PageSelector";
import { findPage, removeLockedPosts } from "@/lib/utilities";
import Image from "next/image";
import LockIcon from "./LockIcon";

interface Props {
	pages: ComicPage[]
	page: number
}

export default function PageReaderNav( { pages, page }: Props ) {
	const unlockedPages = removeLockedPosts( pages );
	const nextPage = findPage( pages, page + 1 )
	const canGoBack = page > 1;
	const canGoForward = !! nextPage;
	const nextPageLocked = nextPage && nextPage.locked;

	return (
		<nav className="page-reader-nav">
			<Button disabled={ page === 1 } href='/page/1'>
				&lt;&lt; <span>First</span>
			</Button>

			<Button disabled={ !canGoBack } href={ `/page/${ page - 1 }` }>
				&lt; <span>Back</span>
			</Button>

			<PageSelector pages={ pages } page={ page } />

			<Button disabled={ !canGoForward } href={ `/page/${ page + 1 }` }>
				{ nextPageLocked &&
					<LockIcon width={ 20 } height={ 20 } />
				}
				<span>Next</span> &gt;
			</Button>

			<Button disabled={ page === unlockedPages.length - 1 || ! nextPage } href='/page/latest'>
				<span>Last</span> &gt;&gt;
			</Button>
		</nav>
	);
}