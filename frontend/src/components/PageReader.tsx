import { PageNumber } from "@/types/types";

import { notFound } from "next/navigation";
import Image from "next/image";
import '@/styles/page-reader.scss';
import { findPage, getImageProps, getPages } from "@/lib/utilities";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";

interface Props {
	page?: PageNumber
}

export default async function PageReader( { page = 'latest' }: Props ) {
	const pages = await getPages();

	let pageNumber = page === 'latest' ? pages.length : page;
	pageNumber = typeof pageNumber !== 'number' ? parseInt( pageNumber ) : pageNumber;

	const pageData = findPage( pages, pageNumber );

	if ( ! pageData ) {
		notFound();
	}

	const { src, width, height, alt } = getImageProps( pageData );

	return (
		<main className='page-reader'>
			<PageReaderNav pages={ pages } page={ pageNumber } />
			<Image
				className='page-image'
				src={ src }
				width={ width }
				height={ height }
				alt={ alt }
				priority={ true }
			/>
			<PageReaderNav pages={ pages } page={ pageNumber } />
		</main>
	)
}
