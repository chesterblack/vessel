import { Metadata } from "next";
import { WP_REST_API_Page } from "wp-types";

import { notFound } from "next/navigation";
import { sendApiRequest } from "@/lib/utilities";


interface Props {
	params: Promise<{ slug: string }>
}

let pageData: WP_REST_API_Page[];

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	let { slug } = await params;

	pageData = await sendApiRequest( 
		'GET',
		'wp/v2/pages',
		{ slug: slug }
	) as WP_REST_API_Page[];

	if ( ! pageData ) {
		notFound();
	}

	const { title, excerpt } = pageData[0];

	return {
		title: `${ title.rendered } | Vessel`,
		description: excerpt.rendered
	}
}

export default async function Page( { params }: Props ) {
	const { slug } = await params;

	if ( ! pageData ) {
		pageData = await sendApiRequest( 
			'GET',
			'wp/v2/pages',
			{ slug: slug }
		) as WP_REST_API_Page[];

		if ( ! pageData ) {
			notFound();
		}
	}

	const { title, content } = pageData[0];

	return (
		<>
			<link rel='stylesheet' type='text/css' href={`${ process.env.BACKEND_URL }/wp-includes/css/dist/block-library/style.min.css`} precedence='low' />
			<main className={ slug }>
				<h1>{ title.rendered }</h1>
				<div
					className="content"
					dangerouslySetInnerHTML={ { __html: content.rendered } }
				/>
			</main>
		</>
	)
}