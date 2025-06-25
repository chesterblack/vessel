'use client'

import Image from "next/image";

import '@/styles/page-reader.scss';
import { ComicContext } from "@/context/comic-context";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";
import { getImageProps } from "@/lib/utilities";


export default function PageReader({pages, page}) {
	const imageProps = {
		...getImageProps( pages[ page - 1 ] ),
		className: 'page-image',
		priority: true
	};

	return (
		<ComicContext.Provider value={ { pages, page } }>
			<main className='page-reader'>
				<PageReaderNav />
				{ imageProps ? <Image { ...imageProps } /> : <PlaceholderPage /> }
				<PageReaderNav />
			</main>
		</ComicContext.Provider>
	)
}
