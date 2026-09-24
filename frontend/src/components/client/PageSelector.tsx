'use client'

import { redirect } from 'next/navigation'
import { ComicIndexWithLock } from '@/types/types';

type Props = {
	pageIndexes: ComicIndexWithLock[]
	currentPageNumber: number
}

/** Dropdown to switch between pages */
export default function PageSelector( { pageIndexes, currentPageNumber }: Props ) {
	if ( ! pageIndexes ) {
		return <option>Loading...</option>;
	}

	return (
		<select
			className='page-selector'
			aria-label='Page select'
			defaultValue={ currentPageNumber }
			onChange={ ( e ) => {
				redirect( `/page/${ e.target.value }` )
			} }
		>
			{ pageIndexes.map( ( { slug, title, page_number, locked } ) => {
					return (
						<option value={ page_number } key={ slug } disabled={ locked }>
							{ title }
						</option>
					)
				} )
			}
		</select>
	);
}