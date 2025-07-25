export async function GET(): Promise<Response> {
	return fetch( `${ process.env.BACKEND_URL }/sitemap.xml` );
}