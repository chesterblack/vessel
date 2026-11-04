import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

export default function usePrevCharacters(
	meta: {
		comic_page_number?: number
		characters?: string[]
	}
) {
	const [ prevCharacters, setPrevCharacters ] = useState([]);

	useEffect( () => {
		( async () => {
			const currentPostMeta = wp.data.select("core/editor").getCurrentPostAttribute( 'meta' );

			const characterData = await apiFetch( {
				path: '/wp/v2/character',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			if ( !currentPostMeta?.comic_page_number ) {
				return;
			}

			const prevPageData = await apiFetch( {
				path: `/wp/v2/comic_page?meta_key=comic_page_number&meta_value=${ parseInt( currentPostMeta.comic_page_number ) - 1 }`,
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			const prevPageCharacters = prevPageData?.[0]?.content_blocks?.[0]?.attrs?.characters;

			if ( !prevPageCharacters ) {
				return;
			}
			
			const characterOptions = options.filter( option => prevPageCharacters.includes( option.value.toString() ) );
			setPrevCharacters( characterOptions );
		} )();
	}, [] );

	function addPrev() {
		if ( !prevCharacters || prevCharacters.length < 1 ) {
			return;
		}

		updateMeta( {
			...meta,
			characters: prevCharacters.map( c => c.value )
		} );
	}

	const addPrevButton = (
		<>
			<label>Previous page's characters:</label>
			<ul style={{display: 'flex', gap: 5, margin: 0}}>
				{ prevCharacters.map( character => <li>
					{ character.label }
				</li> ) }
			</ul>
			<Button variant='primary' onClick={ addPrev }>
				Set to previous page
			</Button>
		</>
	);

}