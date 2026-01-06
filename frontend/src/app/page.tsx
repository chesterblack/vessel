import { Metadata } from "next";

import PageReader from "@/components/PageReader";
import { getComicPageMetadata } from "@/lib/utilities";
import { auth } from "@/auth";

export async function generateMetadata(): Promise<Metadata> {
	const metadata = await getComicPageMetadata( 'latest' );
	return metadata;
}

export default async function HomePage() {
	const user = await auth();
	return <PageReader />
}
