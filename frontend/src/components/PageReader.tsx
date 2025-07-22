import { PageNumber } from "@/types/types";

import { notFound } from "next/navigation";
import Image from "next/image";
import '@/styles/page-reader.scss';
import { findPage, getImageProps, getPages } from "@/lib/utilities";
import PageReaderNav from "@/components/PageReaderNav";
import JsonLdSchema from "./JsonLdSchema";
import JumpToTop from "./JumpToTop";


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

	const schema = pageData.yoast_head_json.schema;

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<main className='page-reader'>
				<JumpToTop />
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
		</>
	)
}
