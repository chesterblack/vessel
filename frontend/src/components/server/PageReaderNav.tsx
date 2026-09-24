import Button from "./Button";
import PageSelector from "../client/PageSelector";
import LockIcon from "./svg/LockIcon";
import { ComicIndexWithLock } from "@/types/types";


type Props = {
	currentPageNumber: number
	pageIndexes: ComicIndexWithLock[]
	latest: ComicIndexWithLock
}

export default function PageReaderNav({ currentPageNumber, pageIndexes, latest}: Props) {
	const latestPageNumber = latest.page_number;

	const canGoBack = currentPageNumber !== 1;
	const prevPage = pageIndexes.find(
		c => c.page_number === currentPageNumber - 1
	);
	const prevPageLocked = prevPage && prevPage.locked;

	const canGoForward = currentPageNumber < latestPageNumber;
	const nextPage = pageIndexes.find(
		c => c.page_number === currentPageNumber + 1
	);
	const nextPageLocked = nextPage && nextPage.locked;

	const lastPageLocked = latestPageNumber !== currentPageNumber && latest.locked;

	return (
		<nav className="page-reader-nav">
			<Button disabled={ currentPageNumber === 1 } href='/page/1'>
				<span className="arrow">&lt;&lt; </span>
				<span className="label">First</span>
			</Button>

			<Button
				disabled={ !canGoBack }
				href={ `/page/${ currentPageNumber - 1 }` }
				classes={ `${ prevPageLocked ? 'locked' : '' }` }
			>
				{ prevPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				<span className="arrow">&lt; </span>
				<span className="label">Back</span>
			</Button>

			<PageSelector
				pageIndexes={ pageIndexes }
				currentPageNumber={ currentPageNumber }
			/>

			<Button
				disabled={ !canGoForward }
				href={ `/page/${ currentPageNumber + 1 }` }
				classes={ `${ nextPageLocked ? 'locked' : '' }` }
			>
				{ nextPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				<span className="label">Next</span>
				<span className="arrow"> &gt;</span>
			</Button>

			<Button
				disabled={ !canGoForward }
				href={`/page/${latestPageNumber}`}
				classes={ `${ lastPageLocked ? 'locked' : '' }` }
			>
				{ lastPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				<span className="label">Last</span>
				<span className="arrow"> &gt;&gt;</span>
			</Button>
		</nav>
	);
}

export function Skeleton() {
	return (
		<nav className="page-reader-nav">
			<Button disabled>
				<span className="arrow">&lt;&lt; </span>
				<span className="label">First</span>
			</Button>
			<Button disabled>
				<span className="arrow">&lt; </span>
				<span className="label">Back</span>
			</Button>

			<Button disabled>
				Loading...
			</Button>

			<Button disabled>
				<span className="label">Next</span>
				<span className="arrow"> &gt;</span>
			</Button>
			<Button disabled>
				<span className="label">Last</span>
				<span className="arrow"> &gt;&gt;</span>
			</Button>
		</nav>
	);
}