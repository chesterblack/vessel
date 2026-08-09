'use client';

import { ComicPage } from "@/types/wp-post-types";

import Button from "./Button";
import PageSelector from "../client/PageSelector";
import { findPage, filterLatestPageNumber, removeLockedPosts } from "@/lib/utilities";
import { VESSEL_EARLY_READER } from "@/lib/constants";
import LockIcon from "./svg/LockIcon";
import UnlockIcon from "./svg/UnlockIcon";
import useGivenComicPages from "@/app/hooks/useGivenComicPages";

type Props = {
	pages: Promise<ComicPage[]>
	page: number
}

export default function PageReaderNav( { pages, page }: Props ) {
	const { isLoading, loadedPages } = useGivenComicPages( pages );

	if ( isLoading ) {
		return "Loading...";
	}

	const unlockedPages = removeLockedPosts( loadedPages );

	const nextPage = findPage( loadedPages, page + 1 );
	const prevPage = findPage( loadedPages, page - 1 );

	const canGoBack = page > 1;
	const canGoForward = !! nextPage;

	const nextPageLocked = nextPage && nextPage.locked;
	const prevPageLocked = prevPage && prevPage.locked;

	const nextPageUnlocked = nextPage && !nextPageLocked && nextPage.locked_to_ids.includes( VESSEL_EARLY_READER );
	const prevPageUnlocked = prevPage && !prevPageLocked && prevPage.locked_to_ids.includes( VESSEL_EARLY_READER );

	return (
		<nav className="page-reader-nav">
			<Button disabled={ page === 1 } href='/page/1'>
				<span className="arrow">&lt;&lt; </span>
				<span className="label">First</span>
			</Button>

			<Button
				disabled={ !canGoBack }
				href={ `/page/${ page - 1 }` }
				classes={ `${ prevPageLocked ? 'locked' : '' } ${ prevPageUnlocked ? 'unlocked' : '' }` }
			>
				{ prevPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				{ prevPageUnlocked && <UnlockIcon width={ 20 } height={ 20 } /> }
				<span className="arrow">&lt; </span>
				<span className="label">Back</span>
			</Button>

			<PageSelector pages={ loadedPages } page={ page } />

			<Button
				disabled={ !canGoForward }
				href={ `/page/${ page + 1 }` }
				classes={ `${ nextPageLocked ? 'locked' : '' } ${ nextPageUnlocked ? 'unlocked' : '' }` }
			>
				{ nextPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				{ nextPageUnlocked && <UnlockIcon width={ 20 } height={ 20 } /> }
				<span className="label">Next</span>
				<span className="arrow"> &gt;</span>
			</Button>

			<Button disabled={ page === filterLatestPageNumber( unlockedPages ) || ! nextPage } href='/page/latest'>
				<span className="label">Last</span>
				<span className="arrow"> &gt;&gt;</span>
			</Button>
		</nav>
	);
}