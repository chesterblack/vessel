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
			{ chapterPages.map( ( { content, type }, i ) => {
					if ( type === 'chapter' ) {
						return (
							<option disabled key={ `${ content.id }-${ i }` }>
								{ content.name }
							</option>
						);
					}

					return (
						<option value={ content.meta.comic_page_number } key={ content.slug }>
							{ content.title.rendered }
						</option>
					)
				} )
			}
		</select>
	);
}