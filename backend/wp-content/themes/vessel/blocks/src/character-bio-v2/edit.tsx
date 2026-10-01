import { useEffect, useState } from 'react';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';

import './editor.scss';
import { TextControl } from '@wordpress/components';
import ImageUpload from '../shared/components/ImageUpload';
import { useEntityProp, useEntityRecords } from '@wordpress/core-data';
import { Image } from '../types';
import { setMeta } from '../shared/utilities';

type Chapter = {
	id: number
	count: number
	description: string
	link: string
	name: string
	slug: string
};

type Attributes = {
	chapters: string
};

type Props = {
	attributes: Attributes,
	setAttributes: ( attrs: Partial<Attributes> ) => void,
	context: {
		postId: string
		postType: string
	}
};

type Bio = {
	chapter: string
} & Partial<{
	name: string|null
	description: string|null
	portrait: Image|null
	pronouns: string|null
}>;

export default function Edit( {
	attributes,
	setAttributes,
	context: {
		postType,
		postId
	}
}: Props ) {
	const blockProps = useBlockProps();
	const [ meta, updateMeta ] = useEntityProp(
		'postType', postType, 'meta', postId
	);
	console.log( 'findme: meta: ', meta );
	const { hasResolved, records: chapters } = useEntityRecords<Chapter>(
		'taxonomy', 'chapters', { per_page: 40 }
	);

	const [ selectedChapterSlug, setSelectedChapterSlug ] = useState<string>('');

	useEffect( () => {
		if ( chapters && chapters.length > 0 ) {
			setSelectedChapterSlug( chapters[chapters.length - 1].slug );
		}
	}, [ chapters ] );

	useEffect( () => {
		if (
			( !meta.chapters || meta.chapters.length === 0 ) &&
			attributes.chapters
		) {
			const attributeObject: Record<string, Partial<{
				name: string|null
				description: string|null
				portrait: Image|null
				pronouns: string|null
			}>> = JSON.parse( attributes.chapters );

			const newChapterBioData = [];

			for ( const key in attributeObject ) {
				const typedKey = key as keyof typeof attributeObject;
				const chapterData = attributeObject[typedKey];

				if ( chapterData ) {
					newChapterBioData.push( {
						chapter: key,
						...chapterData
					} );
				}
			}

			setMeta( 'chapters', newChapterBioData, meta, updateMeta );
		}
	}, [] );

	function setChapterAttribute<K extends keyof Bio>(
		key: K,
		value: Bio[K]
	) {
		const foundBioIndex = meta.chapters.findIndex(
			(x: Bio) => x.chapter === selectedChapterSlug
		);

		const newChapterBioData: Bio[] = [];
		for (const object of meta.chapters) {
			newChapterBioData.push({...object});
		}

		
		if ( foundBioIndex >= 0 ) {
			if ( !value ) {
				delete newChapterBioData[foundBioIndex][key];
			} else {
				newChapterBioData[foundBioIndex][key] = value;
			}
		} else if ( value ) {
			const newBio: Bio = { chapter: selectedChapterSlug };
			newBio[key] = value;
			newChapterBioData.push( newBio );
		}

		setMeta( 'chapters', newChapterBioData, meta, updateMeta );
	}

	if ( !hasResolved ) {
		return 'Loading...';
	}

	if ( !chapters || chapters.length === 0 ) {
		return <div {...blockProps}>Could not find chapters</div>
	}

	const thisChapterBio = meta.chapters ? meta.chapters.find(
		( x: Bio ) => x.chapter === selectedChapterSlug
	) : {};

	const name        = thisChapterBio?.name ?? '';
	const pronouns    = thisChapterBio?.pronouns ?? '';
	const description = thisChapterBio?.description ?? '';
	const portrait    = thisChapterBio?.portrait ?? {};

	return (
		<div { ...blockProps }>
			<SelectControl
				label='Chapter Selector'
				value={ selectedChapterSlug }
				options={ chapters.map( chapter => ( {
					label: chapter.name,
					value: chapter.slug
				} ) ) }
				onChange={ v => setSelectedChapterSlug( v ) }
			/>

			<div className='inner'>
				<div style={{ minWidth: '150px' }}>
					<ImageUpload
						label='Portrait'
						image={ portrait }
						callback={ ( { url, width, height, alt } ) => {
							setChapterAttribute( 'portrait', { url, width, height, alt } );
						} }
						deleteCallback={ () => {
							setChapterAttribute( 'portrait', null );
						} }
					/>
				</div>

				<div style={{ width: '100%' }}>
					<div className='inner'>
						<div style={{width: '100%'}}>
							<TextControl
								className='name'
								label='Name'
								value={ name }
								onChange={ value => setChapterAttribute('name', value) }
							/>
						</div>
						
						<TextControl
							className='pronouns'
							label='Pronouns'
							value={ pronouns }
							onChange={ value => setChapterAttribute( 'pronouns', value ) }
						/>
						
					</div>

					<label>Description</label>
					<RichText
						className='description'
						tagName='p'
						value={ description }
						onChange={ value => setChapterAttribute( 'description', value ) }
					/>
				</div>
			</div>
		</div>
	)
}