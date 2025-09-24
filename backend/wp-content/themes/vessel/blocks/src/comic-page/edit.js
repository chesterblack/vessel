import { TextControl } from '@wordpress/components'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from './CharacterTags';
import './editor.scss';
import BackgroundGradientPicker from './BackgroundGradientPicker';

export default function Edit( { attributes, setAttributes, context } ) {
	const postId = wp.data.select('core/editor').getCurrentPostId();
	const [ meta, setMeta ] = useEntityProp( 'postType', 'comic_page', 'meta', postId );

	return (
		<div { ...useBlockProps() } style={{ background: attributes.backgroundGradient }}>
			<div className='inner'>
				<TextControl
					label='Page Number'
					type='number'
					value={ attributes.pageNumber }
					onChange={ ( value ) => {
						setAttributes( { pageNumber: parseFloat( value ) } );
						setMeta( { ...meta, comic_page_number: parseFloat( value ) } );
					} }
				/>

				<label>Comic Page</label>
				<ImageUpload
					image={ attributes.pageImage }
					callback={ ( media ) => {
						console.log( 'media: ', media );
						setAttributes( {
							pageImage: {
								url: media.url,
								sizes: media.sizes,
								width: media.width,
								height: media.height,
								alt: media.alt
							}
						} );
					} }
					deleteCallback={ () => {
						setAttributes( { pageImage: null } );
					} }
				/>
			</div>

			<InspectorControls key='inspector'>
				<CharacterTags attributes={ attributes } setAttributes={ setAttributes } />
				<BackgroundGradientPicker attributes={ attributes } setAttributes={ setAttributes } />
			</InspectorControls>
		</div>
	);
}
