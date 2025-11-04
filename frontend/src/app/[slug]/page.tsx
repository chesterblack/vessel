
import { Metadata } from "next";
import { SluggedPageProps } from "@/types/types";

import { notFound } from "next/navigation";
import parse from 'html-react-parser';
import { getYoastMetadata } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";
import { getWebPage } from "@/lib/data-fetching";

export async function generateMetadata( { params }: SluggedPageProps ): Promise<Metadata> {
	const { slug } = await params;
	const pageData = await getWebPage( slug );

	if ( ! pageData ) {
		notFound();
	}

	return getYoastMetadata( pageData );
}

export default async function Page( { params }: SluggedPageProps ) {
	const { slug } = await params;
	const pageData = await getWebPage( slug );

	if ( ! pageData ) {
		notFound();
	}

	const title   = pageData.title;
	const content = parse( pageData.content.rendered );
	const schema  = pageData.yoast_head_json.schema;

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<link rel='stylesheet' type='text/css' href={`${ process.env.BACKEND_URL }/wp-includes/css/dist/block-library/style.min.css`} precedence='low' />

			<main className={ slug }>
				<h1>{ title.rendered }</h1>
				<div className="content">
					{ content }
				</div>
			</main>
		</>
	)
}