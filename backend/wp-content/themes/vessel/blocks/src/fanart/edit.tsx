import { useBlockProps } from '@wordpress/block-editor';
import ImageUpload from '../shared/components/ImageUpload';
import './editor.scss';
import CharacterTags from '../shared/components/CharacterTags';
import { useEntityProp } from '@wordpress/core-data';
import { ImageWithSizes, KeyMap } from '../types';
import { copyLegacyAttributes, setMeta } from '../shared/utilities';
import { TextControl } from '@wordpress/components';
import { useEffect } from 'react';

type Attributes = {
	pageImage: ImageWithSizes
	creditName: string
	creditLink: string
	characters: number[]
}

type Props = {
	attributes: Attributes,
	context: {
		postId: string
		postType: string
	}
}

export default function Edit( {
	attributes,
	context: {
		postType,
		postId
	}
}: Props ) {
	const [ meta, updateMeta ] = useEntityProp(
		'postType', postType, 'meta', postId
	);

	useEffect( () => {
		const legacyAttributes: KeyMap<typeof meta, typeof attributes> = [
			['credit_name', 'creditName'],
			['credit_link', 'creditLink'],
			['characters', 'characters'],
		];

		copyLegacyAttributes( attributes, legacyAttributes, meta, updateMeta );
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<div className='inner'>
				<label>Fanart</label>
				<ImageUpload
					image={ meta.page_image }
					callback={
						( { id, url, sizes, width, height, alt } ) => {
							setMeta('page_image', { id, url, sizes, width, height, alt }, meta, updateMeta);
						}
					}
					deleteCallback={
						() => {
							setMeta( 'page_image', null, meta, updateMeta );
						}
					}
				/>

				<div className='info'>
					<div className="credit">
						<label>Credit</label>

						<TextControl
							label='Credit'
							value={ meta.credit_name }
							onChange={ value => setMeta( 'credit_name', value, meta, updateMeta ) }
						/>

						<TextControl
							label='Credit Link'
							value={ meta.credit_link }
							onChange={ value => setMeta( 'credit_link', value, meta, updateMeta ) }
						/>
					</div>

					<CharacterTags meta={ meta } updateMeta={ updateMeta } />
				</div>
			</div>
		</div>
	);
}