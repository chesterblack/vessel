import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';
import ImageUpload from '../shared/components/ImageUpload';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<ImageUpload
				image={ attributes.pageImage }
				callback={ ( media ) => {
					setAttributes( { pageImage: media } );
				} }
			/>
		</div>
	);
}
