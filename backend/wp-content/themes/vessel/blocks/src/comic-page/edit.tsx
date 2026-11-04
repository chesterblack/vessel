import './editor.scss';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from '../shared/components/CharacterTags';
import BackgroundGradientPicker from './BackgroundGradientPicker';
import { useEntityProp } from '@wordpress/core-data';
import { Image, KeyMap } from '../types';
import { useEffect } from 'react';
import { copyLegacyAttributes, setMeta } from '../shared/utilities';

type Attributes = {
	pageImage?: Image
	characters: string[]
	backgroundGradient: string
	backgroundImage: Image
}

type Props = {
	attributes: Attributes,
	context: {
		postId: string
		postType: string
	}
}

export default function Edit( {
	attributes,
	context: {
		postType,
		postId
	}
}: Props ) {
	const [ meta, updateMeta ] = useEntityProp( 'postType', postType, 'meta', postId );

	useEffect( () => {
		const legacyAttributes: KeyMap<typeof meta, typeof attributes> = [
			['characters', 'characters'],
			['page_image', 'pageImage'],
			['background_gradient', 'backgroundGradient'],
			['background_image', 'backgroundImage'],
		];

		copyLegacyAttributes( attributes, legacyAttributes, meta, updateMeta );
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Comic Page</label>
				<ImageUpload
					image={ meta.page_image }
					callback={ ( { id, url, sizes, width, height, alt } ) => {
						setMeta('page_image', { id, url, sizes, width, height, alt }, meta, updateMeta);
					} }
					deleteCallback={ () => {
						setMeta( 'page_image', null, meta, updateMeta );
					} }
				/>
			</div>

			<InspectorControls key='inspector'>
				<PanelBody title='Characters'>
					<CharacterTags meta={ meta } updateMeta={ updateMeta } />
				</PanelBody>
				<PanelBody title='Background'>
					<BackgroundGradientPicker meta={ meta } setMeta={ setMeta } />
					<ImageUpload
						label='Image'
						image={ meta.background_image }
						callback={ ( { id, url, sizes, width, height, alt } ) => {
							setMeta('background_image', { id, url, sizes, width, height, alt }, meta, updateMeta);
						} }
						deleteCallback={ () => {
							setMeta( 'background_image', null, meta, updateMeta );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
