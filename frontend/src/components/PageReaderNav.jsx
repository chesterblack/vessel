import Button from "./Button";
import PageSelector from "./PageSelector";

export default function PageReaderNav( { pages, page } ) {
	const canGoBack = page > 1;
	const canGoForward = page < pages?.length;

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
				<span>Next</span> &gt;
			</Button>

			<Button disabled={ page === pages.length } href='/page/latest'>
				<span>Last</span> &gt;&gt;
			</Button>
		</nav>
	);
}