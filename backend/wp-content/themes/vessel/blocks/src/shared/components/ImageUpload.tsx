import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

type Props = {
	image?: {
		url: string
		id?: number
	}
	callback: MediaUpload.Props<false>['onSelect']
	label: string
	deleteCallback: () => void
}

export default function ImageUpload( { image, callback, label, deleteCallback }: Props ) {
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