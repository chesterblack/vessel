import { Metadata } from 'next';
import PageReader from '@/components/server/PageReader';
import { getComicPageMetadata } from '@/lib/utilities';
import { getComicReaderData } from '@/lib/data-fetching';
import { getUser } from '@/lib/users';
import { VESSEL_EARLY_READER } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
	const user = await getUser();
	const unlockedOnly = !user || !user.roles.includes(VESSEL_EARLY_READER);
	const comicReaderData = await getComicReaderData( undefined, unlockedOnly );

	const metadata = await getComicPageMetadata( comicReaderData.current );

	return metadata;
}

export default async function HomePage() {
	const user = await getUser();
	const unlockedOnly = !user || !user.roles.includes(VESSEL_EARLY_READER);
	const comicReaderData = await getComicReaderData( undefined, unlockedOnly );

	return <PageReader comicReaderData={ comicReaderData } user={ user } />;
}
