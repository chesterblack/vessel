import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { SelectControl } from '@wordpress/components';
import { Button } from '@wordpress/components';

export default function CharacterTags( { attributes, setAttributes } ) {
	const [ characters, setCharacters ] = useState([]);
	const [ prevCharacters, setPrevCharacters ] = useState([]);

	useEffect( () => {
		( async () => {
			const currentPostMeta = wp.data.select("core/editor").getCurrentPostAttribute( 'meta' );

			const characterData = await apiFetch( {
				path: '/wp/v2/character',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			const options = [
				...characterData.map( ( character ) => ( {
					label: character.title.rendered,
					value: character.id
				} ) ),
			];

			setCharacters( options );

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

		setAttributes( { characters: prevCharacters.map( c => c.value ) } );
	}

	return (
		<>
			<SelectControl
				multiple
				label="Who is on this page?"
				value={ attributes.characters }
				options={ characters }
				onChange={ c => setAttributes( { characters: c } ) }
			/>

			{ prevCharacters && prevCharacters.length > 0 &&
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
			}
		</>
	);
};
