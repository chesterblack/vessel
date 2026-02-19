import { useEffect, useState } from 'react';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';
import { TextControl } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';

export default function Edit( { attributes, setAttributes } ) {
	const [ chapters, setChapters ] = useState( [] );
	const [ selectedChapter, setSelectedChapter ] = useState();

	function setJsonAttribute( key, value ) {
		const allData = JSON.parse( attributes.chapters );
		const chapterData = allData[ selectedChapter ] ?? {};
		chapterData[ key ] = value;

		const newAttributes = { chapters: allData };
		newAttributes.chapters[ selectedChapter ] = chapterData;

		setAttributes( { chapters: JSON.stringify( newAttributes.chapters ) } );
	}

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

	const thisChapter = JSON.parse( attributes.chapters )?.[ selectedChapter ];
	const name        = thisChapter?.name ?? '';
	const description = thisChapter?.description ?? '';
	const portrait       = thisChapter?.portrait ?? {};

	return (
		<div { ...useBlockProps() }>
			<SelectControl
				label='Chapter Selector'
				value={ selectedChapter }
				options={ chapters }
				onChange={ v => setSelectedChapter( v ) }
			/>

			<div className='inner'>
				<div style={{ minWidth: '150px' }}>
					<ImageUpload
						label='Portrait'
						image={ portrait }
						callback={ ( { url, width, height, alt } ) => {
							setJsonAttribute( 'portrait', { url, width, height, alt } );
						} }
						deleteCallback={ () => {
							setJsonAttribute( 'portrait', null );
						} }
					/>
				</div>

				<div style={{ width: '100%' }}>
					<TextControl
						className='name'
						label='Name'
						value={ name }
						onChange={ value => setJsonAttribute( 'name', value ) }
					/>

					<label>Description</label>
					<RichText
						className='description'
						tagName='p'
						value={ description }
						onChange={ value => setJsonAttribute( 'description', value ) }
					/>
				</div>
			</div>
		</div>
	)
}