import { Metadata } from 'next';
import PageReader from '@/components/server/PageReader';
import { getComicPageMetadata } from '@/lib/utilities';
import { getComicReaderData } from '@/lib/data-fetching';
import { getUser } from '@/lib/users';


type Props = {
	params: Promise<{ number: string }>
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	let { number } = await params;
	const comicReaderData = await getComicReaderData(
		parseInt(number)
	);

	const metadata = await getComicPageMetadata( comicReaderData.current );

	return metadata;
}

export default async function NumberedPage( { params }: Props ) {
	let { number } = await params;
	const user = await getUser();
	const comicReaderData = await getComicReaderData(
		parseInt(number)
	);

	return <PageReader comicReaderData={ comicReaderData } user={ user } />;
}
