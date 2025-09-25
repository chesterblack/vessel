import { GradientPicker, PanelBody } from '@wordpress/components';
import { useState } from 'react';

export default function BackgroundGradientPicker( { setAttributes, attributes } ) {
	return (
		<PanelBody title='Background'>
			<div className='background-gradient-picker'>
				<GradientPicker
					onChange={ g => setAttributes( { backgroundGradient: g } ) }
					value={ attributes.backgroundGradient }
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
		</PanelBody>
	);
}