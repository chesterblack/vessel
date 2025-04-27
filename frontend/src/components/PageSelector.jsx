import { ComicContext } from "@/context/comic-context";
import { useContext } from "react";

export default function PageSelector() {
	const { pages, currentPageNumber, setCurrentPageNumber } = useContext( ComicContext );

	let options = <option>Loading...</option>;

	if ( pages ) {
		options = pages.map( ( { title, slug }, index ) => (
			<option value={ index + 1 } key={ slug }>
				{ title.rendered }
			</option>
		) );
	}

	return (
		<select
			value={ currentPageNumber }
			onChange={ ( e ) => {
				setCurrentPageNumber( parseInt( e.target.value ) );
			} }
		>
			{ options }
		</select>
	);
}