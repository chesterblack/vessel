import { useContext } from "react";
import { redirect } from 'next/navigation'
import { ComicContext } from "@/context/comic-context";

export default function PageSelector() {
	const { pages, page } = useContext( ComicContext );

	let options = <option>Loading...</option>;

	if ( pages ) {
		options = pages.map( ( { title, slug, meta }, index ) => (
			<option value={ meta.comic_page_number } key={ slug }>
				{ title.rendered }
			</option>
		) );
	}

	return (
		<select
			aria-label='Page select'
			defaultValue={ page }
			onChange={ ( e ) => {
				redirect( `/page/${ e.target.value }` )
			} }
		>
			{ options }
		</select>
	);
}