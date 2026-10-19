import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { SelectControl } from '@wordpress/components';

type Props = {
	meta: { characters?: string[] }
	updateMeta: Function
}

export default function CharacterTags( {
	meta,
	updateMeta
}: Props ) {
	const [ characters, setCharacters ] = useState<{ label: string; value: string; }[]>([]);

	useEffect( () => {
		( async () => {
			const characterData = await apiFetch<{title: {rendered: string}, id: number}[]>( {
				path: '/wp/v2/character',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			const options = [
				...characterData.map( ( character ) => ( {
					label: character.title.rendered,
					value: character.id.toString()
				} ) ),
			];

			setCharacters( options );
		} )();
	}, [] );

	return (
		<>
			<SelectControl
				multiple
				label="Who is on this page?"
				value={ meta.characters }
				options={ characters }
				onChange={ c => updateMeta({ 
					...meta,
					characters: c
				} ) }
			/>
		</>
	);
};
