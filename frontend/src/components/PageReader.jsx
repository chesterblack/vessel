import Image from "next/image";

import '@/styles/page-reader.scss';
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
		<main className='page-reader'>
			<PageReaderNav pages={ pages } page={ page } />
			{ imageProps ? <Image { ...imageProps } /> : <PlaceholderPage /> }
			<PageReaderNav pages={ pages } page={ page } />
		</main>
	)
}
