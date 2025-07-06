import { Metadata } from "next";
import { WP_REST_API_Page_Vessel } from "@/types/wp-post-types";

import { notFound } from "next/navigation";
import parse from 'html-react-parser';
import { sendApiRequest } from "@/lib/utilities";
import { getYoastMetadata } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";


export interface Props {
	params: Promise<{ slug: string }>
}

export let pageData: WP_REST_API_Page_Vessel[];

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	let { slug } = await params;

	pageData = await sendApiRequest( 
		'GET',
		'wp/v2/pages',
		{ slug: slug }
	) as WP_REST_API_Page_Vessel[];

	if ( ! pageData ) {
		notFound();
	}

	return getYoastMetadata( pageData[0] );
}

export default async function Page( { params }: Props ) {
	const { slug } = await params;

	if ( ! pageData ) {
		pageData = await sendApiRequest( 
			'GET',
			'wp/v2/pages',
			{ slug: slug }
		) as WP_REST_API_Page_Vessel[];

		if ( ! pageData ) {
			notFound();
		}
	}

	const title = pageData[0].title;
	const content = parse( pageData[0].content.rendered );
	const schema = pageData[0].yoast_head_json.schema;

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