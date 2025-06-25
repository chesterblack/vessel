import { WP_REST_API_ComicPage } from "@/types/wp-post-types";
import Button from "./Button";
import PageSelector from "./PageSelector";

interface Props {
	pages: WP_REST_API_ComicPage[]
	page: number
}

export default function PageReaderNav( { pages, page }: Props ) {
	const canGoBack = page > 1;
	const canGoForward = page < pages.length;

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