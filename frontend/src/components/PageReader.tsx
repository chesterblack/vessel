import { PageNumber } from "@/types/types";

import { notFound } from "next/navigation";
import Image from "next/image";
import '@/styles/page-reader.scss';
import { getImageProps, getPages } from "@/lib/utilities";
import PageReaderNav from "@/components/PageReaderNav";
import PlaceholderPage from "@/components/PlaceholderPage";

interface Props {
	page?: PageNumber
}

export default async function PageReader( { page = 'latest' }: Props ) {
	const pages = await getPages();

	page = page === 'latest' ? pages.length : page;
	page = typeof page !== 'number' ? parseInt( page ) : page;

	if ( ! pages[ page - 1 ] ) {
		notFound();
	}

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
