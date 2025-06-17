import { useContext } from "react";

import { ComicContext } from "@/context/comic-context";
import Button from "./Button";
import PageSelector from "./PageSelector";

export default function PageReaderNav() {
	const { pages, currentPageNumber, setCurrentPageNumber } = useContext( ComicContext );

	const canGoBack = currentPageNumber > 1;
	const canGoForward = currentPageNumber < pages?.length;

	return (
		<nav className="page-reader-nav">
			<Button
				disabled={ currentPageNumber === 1 }
				onClick={ () => setCurrentPageNumber( 1 ) }
			>
				&lt;&lt; <span>First</span>
			</Button>

			<Button
				disabled={ !canGoBack }
				onClick={ () => setCurrentPageNumber( currentPageNumber - 1 ) }
			>
				&lt; <span>Back</span>
			</Button>

			<PageSelector />

			<Button
				disabled={ !canGoForward }
				onClick={ () => setCurrentPageNumber( currentPageNumber + 1 ) }
			>
				<span>Next</span> &gt;
			</Button>

			<Button
				disabled={ currentPageNumber === pages.length }
				onClick={ () => setCurrentPageNumber( pages.length ) }
			>
				<span>Last</span> &gt;&gt;
			</Button>
		</nav>
	);
}