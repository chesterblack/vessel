import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { SelectControl } from '@wordpress/components';

export default function DescriptionChapterSelector( { selectedChapter, setSelectedChapter } ) {
	const [ chapters, setChapters ] = useState([]);

	useEffect( () => {
		( async () => {
			const data = await apiFetch( {
				path: '/wp/v2/chapters',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			} );

			const options = data.map( ( chapter ) => (
				{
					label: chapter.name,
					value: chapter.slug
				}
			) );

			setChapters( options );
			setSelectedChapter( options[0].value );
		} )();
	}, [] );

	return (
		<SelectControl
			label='Description'
			value={ selectedChapter }
			options={ chapters }
			onChange={ value => setSelectedChapter( value ) }
		/>
	);
}