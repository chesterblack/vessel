import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { SelectControl } from '@wordpress/components';

export default function CharacterTags( { attributes, setAttributes } ) {
	const [ characters, setCharacters ] = useState([]);

	useEffect( () => {
		( async () => {
			const data = await apiFetch( {
				path: '/wp/v2/character',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			const options = [
				...data.map( ( character ) => ( {
					label: character.title.rendered,
					value: character.id
				} ) ),
			];

			console.log( 'options: ', options );

			setCharacters( options );
		} )();
	}, [] );

	return (
		<SelectControl
			multiple
			label="Characters"
			value={ attributes.characters }
			options={ characters }
			onChange={ c => setAttributes( { characters: c } ) }
		/>
	);
};
