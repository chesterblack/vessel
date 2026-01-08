import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ImageUpload from '../shared/components/ImageUpload';
import CharacterTags from './CharacterTags';
import './editor.scss';
import BackgroundGradientPicker from './BackgroundGradientPicker';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
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
