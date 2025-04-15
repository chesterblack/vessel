import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';
import DescriptionRepeater from './components/DescriptionRepeater';

export default function Edit( { attributes, setAttributes } ) {
	const {
		portrait,
		name,
		descriptions
	} = attributes;

	const setDescription = ( chapter, description ) => {
		const newDescriptions = { ...descriptions }
		newDescriptions[ chapter ] = description;

		setAttributes( { descriptions: newDescriptions } );
	}

	return (
		<div { ...useBlockProps() }>
			<div className='unchanging-info'>
				<div className='portrait'>
					<ImageUpload
						label='Portrait'
						image={ portrait }
						callback={ media => setAttributes( { portrait: media } ) }
					/>
				</div>
			</div>
			<div className='changing-info'>
				<DescriptionRepeater
					descriptions={ descriptions }
					setDescription={ setDescription }
				/>
			</div>
		</div>
	);
}
