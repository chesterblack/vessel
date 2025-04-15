import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function ImageUpload( { image, callback, label } ) {
	return (
		<div className='image-upload'>
			{ label && <label>{label}</label> }
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ callback }
					allowedTypes={ [ 'image' ] }
					value={ image?.id }
					render={ ( { open } ) => (
						<Button onClick={ open } variant='primary'>
							Open Media Library
						</Button>
					) }
				/>
			</MediaUploadCheck>
			{ image && <img className='comic-preview' src={ image.url } /> }
		</div>
	);
}