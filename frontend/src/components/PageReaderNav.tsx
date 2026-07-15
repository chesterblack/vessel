import { ComicPage } from "@/types/wp-post-types";

import Button from "./Button";
import PageSelector from "./PageSelector";
import { findPage, getLatestPageNumber, removeLockedPosts } from "@/lib/utilities";
import Image from "next/image";
import LockIcon from "./LockIcon";

interface Props {
	pages: ComicPage[]
	page: number
}

export default function PageReaderNav( { pages, page }: Props ) {
	const unlockedPages = removeLockedPosts( pages );
	const nextPage = findPage( pages, page + 1 );
	const prevPage = findPage( pages, page - 1 );
	const canGoBack = page > 1;
	const canGoForward = !! nextPage;
	const nextPageLocked = nextPage && nextPage.locked;
	const prevPageLocked = prevPage && prevPage.locked;

	return (
		<nav className="page-reader-nav">
			<Button disabled={ page === 1 } href='/page/1'>
				&lt;&lt; <span className="label">First</span>
			</Button>

			<Button disabled={ !canGoBack } href={ `/page/${ page - 1 }` } classes={ prevPageLocked && 'locked' }>
				{ prevPageLocked &&
					<LockIcon width={ 20 } height={ 20 } />
				}
				<span className="arrow">&lt; </span>
				<span className="label">Back</span>
			</Button>

			<PageSelector pages={ pages } page={ page } />

			<Button disabled={ !canGoForward } href={ `/page/${ page + 1 }` } classes={ nextPageLocked && 'locked' }>
				{ nextPageLocked &&
					<LockIcon width={ 20 } height={ 20 } />
				}
				<span className="label">Next</span>
				<span className="arrow"> &gt;</span>
			</Button>

			<Button disabled={ page === getLatestPageNumber( unlockedPages ) || ! nextPage } href='/page/latest'>
				<span className="label">Last</span> &gt;&gt;
			</Button>
		</nav>
	);
}