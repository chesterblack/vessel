import { TextControl } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(), []
	);

	const [ meta, setMeta ] = useEntityProp( 'postType', 'comic_page', 'meta', 39 );

	console.log( 'meta: ', meta );

	return (
		<div { ...useBlockProps() }>
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
					setAttributes( { pageImage: media } );
				} }
			/>
		</div>
	);
}
