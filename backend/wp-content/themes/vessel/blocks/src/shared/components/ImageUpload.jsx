import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { Button } from '@wordpress/components';

export default function ImageUpload( { image, callback, label, deleteCallback } ) {
	return (
		<div className='image-upload'>
			{ label && <label>{ label }</label> }
			{ image?.url && deleteCallback &&
				<div className='image-upload-preview'>
					<Button
						className='delete'
						variant='primary'
						icon='trash'
						isDestructive
						onClick={ deleteCallback }
					/>
					<img src={ image.url } />
				</div>
			}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ callback }
					allowedTypes={ [ 'image' ] }
					value={ image?.id }
					render={ ( { open } ) => (
						<Button
							onClick={ open }
							variant='primary'
							text='Open Media Library'
						/>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
}