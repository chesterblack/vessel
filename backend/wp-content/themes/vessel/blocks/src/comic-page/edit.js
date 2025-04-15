import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => {
						setAttributes( { pageImage: media } );
					} }
					allowedTypes={ [ 'image' ] }
					value={ attributes.pageImage?.id }
					render={ ( { open } ) => (
						<Button onClick={ open } variant='primary'>
							Open Media Library
						</Button>
					) }
				/>
			</MediaUploadCheck>
			{ attributes.pageImage && <img className='comic-preview' src={ attributes.pageImage.url } /> }
		</div>
	);
}
