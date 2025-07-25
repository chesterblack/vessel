import { NextResponse } from "next/server";

export async function GET() {
	const xml = await fetch( `${ process.env.BACKEND_URL }/sitemap.xml` ).then( r => r.text() );
	return new Response( xml, {
		status: 200,
		statusText: 'ok',
		headers: { 'Content-Type': 'text/xml' }
	} );
}