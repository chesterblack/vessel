import { useContext } from "react";
import Image from "next/image";
import { ComicContext } from "@/context/comic-context";
import PageReaderNav from "./PageReaderNav";


export default function PageReader() {
	const { currentPage } = useContext( ComicContext );
	const image = currentPage?.content_blocks[0]?.attrs?.pageImage;

	return (
		<main className='page-reader'>
			<PageReaderNav />
			{ image && <Image
				src={ image.url }
				width={ image.width }
				height={ image.height }
				alt={ image.alt }
			/> }
			<PageReaderNav />
		</main>
	);
}