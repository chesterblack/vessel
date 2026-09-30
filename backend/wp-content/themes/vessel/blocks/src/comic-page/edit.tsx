import './editor.scss';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from '../shared/components/CharacterTags';
import BackgroundGradientPicker from './BackgroundGradientPicker';
import { useEntityProp } from '@wordpress/core-data';
import { Image } from '../types';

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

	if (
		(!meta.characters || meta.characters.length === 0) &&
		attributes.characters
	) {
		setMeta('characters', attributes.characters);
	}
	
	if (
		(!meta.page_image || meta.page_image.length === 0) &&
		attributes.pageImage
	) {
		setMeta('page_image', attributes.pageImage);
	}

	console.log( 'findme: meta: ', meta );

	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Comic Page</label>
				<ImageUpload
					label=''
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
					<BackgroundGradientPicker attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
