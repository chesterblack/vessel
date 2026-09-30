import './editor.scss';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from '../shared/components/CharacterTags';
import BackgroundGradientPicker from './BackgroundGradientPicker';
import { useEntityProp } from '@wordpress/core-data';
import { Image } from '../types';
import { useEffect } from 'react';

type Attributes = {
	pageImage?: Image
	characters: string[]
	backgroundGradient: string
	backgroundImage: Image
}

type Props = {
	attributes: Attributes,
	setAttributes: ( attrs: Partial<Attributes> ) => void,
	context: {
		postId: string
		postType: string
	}
}

export default function Edit( {
	attributes,
	setAttributes,
	context: {
		postType,
		postId
	}
}: Props ) {
	const [ meta, updateMeta ] = useEntityProp( 'postType', postType, 'meta', postId );

	function setMeta<T extends keyof typeof meta>(
		key: T,
		data: typeof meta[T]
	) {
		const newValue = {...meta};
		newValue[key] = data;
		updateMeta({...newValue});
	}

	useEffect( () => {
		const legacyAttributes: [
			keyof typeof meta,
			keyof typeof attributes
		][] = [
			['characters', 'characters'],
			['page_image', 'pageImage'],
			['background_gradient', 'backgroundGradient'],
			['background_image', 'backgroundImage'],
		];

		for ( const keys of legacyAttributes ) {
			const [ metaKey, attrKey ] = keys;
			const metaValue = meta[ metaKey ];
			const attrValue = attributes[ attrKey ];
	
			if ( ( !metaValue || (
				typeof metaValue === 'object' &&
				'length' in metaValue &&
				metaValue.length === 0
			) ) && attrValue ) {
				setMeta( metaKey, attrValue );
			}
		}
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Comic Page</label>
				<ImageUpload
					image={ meta.page_image }
					callback={ ( { id, url, sizes, width, height, alt } ) => {
						setMeta('page_image', { id, url, sizes, width, height, alt });
					} }
					deleteCallback={ () => {
						setMeta( 'page_image', null );
					} }
				/>
			</div>

			<InspectorControls key='inspector'>
				<PanelBody title='Characters'>
					<CharacterTags meta={ meta } updateMeta={ updateMeta } />
				</PanelBody>
				<PanelBody title='Background'>
					<BackgroundGradientPicker meta={ meta } setMeta={ setMeta } />
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
