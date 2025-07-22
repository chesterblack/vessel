'use client'

import { ComicPage } from '@/types/wp-post-types';
import { ReactElement } from 'react';

import { redirect } from 'next/navigation'

interface Props {
	pages: ComicPage[]
	page: number
}

export default function PageSelector( { pages, page }: Props ) {
	let options: ReactElement | ReactElement[] = <option>Loading...</option>;

	if ( pages ) {
		options = pages.map( ( { title, slug, meta } ) => (
			<option value={ meta.comic_page_number } key={ slug }>
				{ title.rendered }
			</option>
		) );
	}

	return (
		<select
			aria-label='Page select'
			defaultValue={ page }
			onChange={ ( e ) => {
				redirect( `/page/${ e.target.value }` )
			} }
		>
			{ options }
		</select>
	);
}