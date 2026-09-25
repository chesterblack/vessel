
import { ComicPage } from '@/types/wp-post-types';
import parse from 'html-react-parser';
import AuthorImage from './AuthorImage';
import { isContentEmpty } from '@/lib/utilities';

type Props = {
	page: ComicPage
}

/**
 * Description of a comic page
 */
export default function AuthorsNote( { page }: Props ) {
	if ( isContentEmpty( page ) ) {
		return null;
	}

	const date = new Date( page.date );

	return (
		<div className="authors-note">
			<AuthorImage author={ { slug: 'kip', name: 'Kip' } } size={ 100 } />
			<div>
				<span className='date'>
					{ `${ date.toDateString() }, ${ date.toLocaleTimeString() }` }
				</span>
				{ parse( page.content.rendered ) }
			</div>
		</div>
	);
}
