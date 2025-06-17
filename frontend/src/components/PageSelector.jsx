import { ComicContext } from "@/context/comic-context";
import { useContext } from "react";

export default function PageSelector() {
	const { pages, currentPageNumber, setCurrentPageNumber } = useContext( ComicContext );

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
			value={ currentPageNumber }
			onChange={ ( e ) => {
				console.log('change');
				setCurrentPageNumber( parseInt( e.target.value ) );
			} }
			aria-label='Page select'
		>
			{ options }
		</select>
	);
}