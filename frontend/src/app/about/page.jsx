import { sendApiRequest } from "@/lib/utilities";

export default async function AboutPage() {
	const pageData = await sendApiRequest( 'GET', 'wp/v2/pages', { title: 'about' } );

	if ( ! pageData ) {
		return 'No content found';
	}

	const content = pageData[0].content.rendered;

	return (
		<main className="about">
			<h1>About Vessel</h1>
			<div className="content" dangerouslySetInnerHTML={ { __html: content } } />
		</main>
	)
}