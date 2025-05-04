import { TextControl } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const postId = wp.data.select('core/editor').getCurrentPostId();
	const [ meta, setMeta ] = useEntityProp( 'postType', 'comic_page', 'meta', postId );

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
					setAttributes( {
						pageImage: {
							url: media.url,
							width: media.width,
							height: media.height,
							alt: media.alt
						}
					} );
				} }
			/>
		</div>
	);
}
