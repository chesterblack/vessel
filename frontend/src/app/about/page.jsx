import { sendApiRequest } from "@/lib/utilities";


export const metadata = {
	title: 'All about Vessel',
	description: '...'
}

export default async function AboutPage() {
	const pageData = await sendApiRequest( 'GET', 'wp/v2/pages', { slug: 'about' } );

	if ( ! pageData ) {
		return (
			<main className="about">
				No content found
			</main>
		);
	}

	const content = pageData[0].content.rendered;

	return (
		<main className="about">
			<h1>About Vessel</h1>
			<div className="content" dangerouslySetInnerHTML={ { __html: content } } />
		</main>
	)
}