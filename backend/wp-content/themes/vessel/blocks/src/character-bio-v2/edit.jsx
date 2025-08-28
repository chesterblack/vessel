import { useEffect, useState } from 'react';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const [ chapters, setChapters ] = useState( [] );
	const [ selectedChapter, setSelectedChapter ] = useState();

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

	if ( ! attributes?.chapters ) {
		setAttributes( { chapters: '{}' } );
	}

	console.log( 'attributes: ', attributes );

	return (
		<div { ...useBlockProps() }>
			<SelectControl
				label='Chapter Selector'
				value={ selectedChapter }
				options={ chapters }
				onChange={ v => setSelectedChapter( v ) }
			/>

			<RichText
				className='description'
				tagName='p'
				value={ JSON.parse( attributes.chapters )?.[ selectedChapter ]?.description }
				onChange={ newValue => {
					const allData = JSON.parse( attributes.chapters );
					const chapterData = allData[ selectedChapter ] ?? {};
					chapterData.description = newValue;

					const newAttributes = { chapters: allData };
					newAttributes.chapters[ selectedChapter ] = chapterData;

					setAttributes( { chapters: JSON.stringify( newAttributes.chapters ) } );
				} }
			/>
		</div>
	)
}