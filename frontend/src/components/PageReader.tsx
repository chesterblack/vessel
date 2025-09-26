import { PageNumber } from "@/types/types";

import { notFound } from "next/navigation";
import Image from "next/image";
import '@/styles/page-reader.scss';
import { findPage, getImageProps, getPages, numeralisePageNumber } from "@/lib/utilities";
import PageReaderNav from "@/components/PageReaderNav";
import JsonLdSchema from "./JsonLdSchema";
import JumpToTop from "./JumpToTop";
import AuthorsNote from "./AuthorsNote";
import CharacterTags from "./CharacterTags";
import Background from "./Background";


interface Props {
	page?: PageNumber
}

export default async function PageReader( { page = 'latest' }: Props ) {
	const pages = await getPages();

	let pageNumber = await numeralisePageNumber( page );

	const pageData = findPage( pages, pageNumber );

	if ( ! pageData ) {
		notFound();
	}

	const { src, width, height, alt } = getImageProps( pageData );

	const schema = pageData.yoast_head_json.schema;

	const { backgroundGradient, backgroundImage } = pageData.content_blocks[0].attrs;

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<main className={`page-reader ${ pageData.class_list.join(' ') }`}>
				<Background backgroundGradient={ backgroundGradient } backgroundImage={ backgroundImage } />
				<JumpToTop />
				<PageReaderNav pages={ pages } page={ pageNumber } />
				<Image
					className='page-image'
					src={ src }
					width={ width }
					height={ height }
					alt={ alt }
					priority={ true }
					fetchPriority='high'
				/>
				<PageReaderNav pages={ pages } page={ pageNumber } />
				<CharacterTags
					characters={ pageData.content_blocks[0].attrs.characters }
					pageData={ pageData }
				/>
				<AuthorsNote page={ pageData } />
			</main>
		</>
	)
}
