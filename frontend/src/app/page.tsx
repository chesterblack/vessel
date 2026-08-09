import { Metadata } from "next";

import PageReader from "@/components/server/PageReader";
import { getComicPageMetadata } from "@/lib/utilities";

export async function generateMetadata(): Promise<Metadata> {
	const metadata = await getComicPageMetadata( 'latest' );
	return metadata;
}

export default async function HomePage() {
	return <PageReader />
}
