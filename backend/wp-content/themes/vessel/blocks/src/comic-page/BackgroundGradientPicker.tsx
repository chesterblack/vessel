import { GradientPicker } from '@wordpress/components';

type Props = {
	meta: {
		background_gradient: string
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
		</>
	);
}