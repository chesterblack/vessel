import Button from "./Button";
import PageSelector from "../client/PageSelector";
import LockIcon from "./svg/LockIcon";
import { ComicIndexWithLock } from "@/types/types";
import { isLocked } from "@/lib/utilities";


type Props = {
	currentPageNumber: number
	pageIndexes: ComicIndexWithLock[]
}

export default function PageReaderNav({currentPageNumber, pageIndexes}: Props) {
	const canGoBack = currentPageNumber !== 1;
	const prevPageLocked = isLocked( pageIndexes.find(
		c => c.page_number === currentPageNumber - 1
	) );

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

			{/* <Button
				disabled={ !canGoForward }
				href={ `/page/${ page + 1 }` }
				classes={ `${ nextPageLocked ? 'locked' : '' } ${ nextPageUnlocked ? 'unlocked' : '' }` }
			>
				{ nextPageLocked && <LockIcon width={ 20 } height={ 20 } /> }
				{ nextPageUnlocked && <UnlockIcon width={ 20 } height={ 20 } /> }
				<span className="label">Next</span>
				<span className="arrow"> &gt;</span>
			</Button> */}

			{/* <Button disabled={ page === filterLatestPageNumber( unlockedPages ) || ! nextPage } href='/page/latest'>
				<span className="label">Last</span>
				<span className="arrow"> &gt;&gt;</span>
			</Button> */}
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