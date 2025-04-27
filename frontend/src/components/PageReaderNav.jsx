import { useContext } from "react";
import Button from "./Button";
import { ComicContext } from "@/context/comic-context";
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
				First
			</Button>

			<Button
				disabled={ !canGoBack }
				onClick={ () => setCurrentPageNumber( currentPageNumber - 1 ) }
			>
				Back
			</Button>

			<PageSelector />

			<Button
				disabled={ !canGoForward }
				onClick={ () => setCurrentPageNumber( currentPageNumber + 1 ) }
			>
				Next
			</Button>

			<Button
				disabled={ currentPageNumber === pages.length }
				onClick={ () => setCurrentPageNumber( pages.length ) }
			>
				Last
			</Button>
		</nav>
	);
}