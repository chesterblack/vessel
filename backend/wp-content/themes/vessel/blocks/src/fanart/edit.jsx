import { useBlockProps } from '@wordpress/block-editor';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Fanart</label>
				<ImageUpload
					image={ attributes.pageImage }
					callback={ ( media ) => {
						setAttributes( {
							pageImage: {
								url: media.url,
								sizes: media.sizes,
								width: media.width,
								height: media.height,
								alt: media.alt
							}
						} );
					} }
					deleteCallback={ () => {
						setAttributes( { pageImage: null } );
					} }
				/>

				<div className="credit">
					<label>Credit</label>

					<input
						type='text'
						value={ attributes.creditName }
						onChange={ ( e ) => setAttributes( { creditName: e.target.value } ) }
						placeholder='Name'
					/>

					<input
						type='text'
						value={ attributes.creditLink }
						onChange={ ( e ) => setAttributes( { creditLink: e.target.value } ) }
						placeholder='URL'
					/>
				</div>
			</div>
		</div>
	);
}