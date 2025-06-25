import { useContext } from "react";

import { ComicContext } from "@/context/comic-context";
import Button from "./Button";
import PageSelector from "./PageSelector";
import Link from "next/link";

export default function PageReaderNav() {
	const { pages, page } = useContext( ComicContext );

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

			<PageSelector />

			<Button disabled={ !canGoForward } href={ `/page/${ page + 1 }` }>
				<span>Next</span> &gt;
			</Button>

			<Button disabled={ page === pages.length } href='/page/latest'>
				<span>Last</span> &gt;&gt;
			</Button>
		</nav>
	);
}