import { WP_REST_API_ComicPage } from "@/types/wp-post-types";

import Image from "next/image";
import '@/styles/page-reader.scss';
import { getImageProps } from "@/lib/utilities";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";

interface Props {
	pages: WP_REST_API_ComicPage[]
	page: number
}

export default function PageReader( { pages, page }: Props ) {
	const imageProps = {
		...getImageProps( pages[ page - 1 ] ),
		className: 'page-image',
		priority: true
	};

	return (
		<main className='page-reader'>
			<PageReaderNav pages={ pages } page={ page } />
			{ imageProps ? <Image { ...imageProps } /> : <PlaceholderPage /> }
			<PageReaderNav pages={ pages } page={ page } />
		</main>
	)
}
