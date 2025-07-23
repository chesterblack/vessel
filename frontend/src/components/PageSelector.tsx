'use client'

import { ComicPage } from '@/types/wp-post-types';

import { redirect } from 'next/navigation'
import { groupPagesByChapter } from '@/lib/utilities';

interface Props {
	pages: ComicPage[]
	page: number
}

export default function PageSelector( { pages, page }: Props ) {
	if ( ! pages ) {
		return <option>Loading...</option>;
	}

	const chapterPages = groupPagesByChapter( pages );

	return (
		<select
			aria-label='Page select'
			defaultValue={ page }
			onChange={ ( e ) => {
				redirect( `/page/${ e.target.value }` )
			} }
		>
			{
				chapterPages.map( chapter => {
					const chapterName = chapter[0];
					const { id, pages } = chapter[1];

					const options = pages.map( ( { title, slug, meta } ) => (
						<option value={ meta.comic_page_number } key={ slug }>
							{ title.rendered }
						</option>
					) );

					return (
						<optgroup label={ chapterName } key={ id }>
							{ options }
						</optgroup>
					);
				} )
			}
		</select>
	);
}