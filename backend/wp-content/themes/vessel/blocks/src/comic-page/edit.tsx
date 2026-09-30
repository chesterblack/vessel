import './editor.scss';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from '../shared/components/CharacterTags';
import BackgroundGradientPicker from './BackgroundGradientPicker';
import { useEntityProp } from '@wordpress/core-data';

type ImageSize = {
	height: number
	width: number
	url: string
	orientation: 'portrait'|'landscape'
}

type Image = {
	id?: number
	alt: string
	height: number
	sizes: Record<string, ImageSize>
	url: string
	width: number
}

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

	if (
		(!meta.characters || meta.characters.length === 0) &&
		attributes.characters
	) {
		updateMeta({
			...meta,
			characters: attributes.characters
		});
	}

	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Comic Page</label>
				<ImageUpload
					label=''
					image={ attributes.pageImage }
					callback={ ( media ) => {
						setAttributes( {
							pageImage: {
								id: media.id,
								url: media.url,
								sizes: media.sizes,
								width: media.width,
								height: media.height,
								alt: media.alt
							}
						} );
					} }
					deleteCallback={ () => {
						setAttributes( { pageImage: undefined } );
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
