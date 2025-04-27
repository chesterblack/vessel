import HomePage from "@/app/page";

export default async function NumberedPage( { params } ) {
	const { number } = await params;

	return <HomePage pageNumber={ parseInt( number ) } />;
}