import { TextControl } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	console.log( 'attributes: ', attributes );
	return (
		<div { ...useBlockProps() }>
			<TextControl
				label='Page Number'
				type='number'
				value={ attributes.pageNumber }
				onChange={ ( value ) => {
					setAttributes( { pageNumber: parseFloat( value ) } );
				} }
			/>

			<label>Comic Page</label>
			<ImageUpload
				image={ attributes.pageImage }
				callback={ ( media ) => {
					setAttributes( { pageImage: media } );
				} }
			/>
		</div>
	);
}
