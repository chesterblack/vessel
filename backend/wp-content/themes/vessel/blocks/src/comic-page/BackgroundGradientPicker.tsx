import { GradientPicker } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import { Image } from '../types';

type Props = {
	meta: {
		background_gradient: string
		background_image: Image
	}
	setMeta: Function
}

export default function BackgroundGradientPicker( { meta, setMeta }: Props ) {
	return (
		<>
			<div className='background-gradient-picker'>
				<GradientPicker
					onChange={ gradient => {
						setMeta('background_gradient', gradient);
					} }
					value={ meta.background_gradient }
					gradients={ [
						{
							gradient: 'linear-gradient( 0deg, #b2e2f4 0%, #51596C 100%)',
							name: 'Illosian Blue',
							slug: 'illosian-blue'
						},
						{
							gradient: 'linear-gradient( 0deg, #2e2a29 0%, #402a25 100%)',
							name: 'Vinicirii Destruction',
							slug: 'vinicirii-destruction'
						},
						{
							gradient: 'linear-gradient( 0deg, #ccc09c 0%, #705b44 100%)',
							name: 'Flashback Sepia',
							slug: 'flashback-sepia'
						},
					] }
				/>
			</div>
			<ImageUpload
				label='Image'
				image={ meta.background_image }
				callback={ ( { id, url, sizes, width, height, alt } ) => {
					setMeta('background_image', { id, url, sizes, width, height, alt });
				} }
				deleteCallback={ () => {
					setMeta( 'background_image', null );
				} }
			/>
		</>
	);
}