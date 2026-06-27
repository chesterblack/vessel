import { ComicPage } from '@/types/wp-post-types';
import parse from 'html-react-parser';
import AuthorImage from './AuthorImage';
import { isContentEmpty } from '@/lib/utilities';

interface Props {
	page: ComicPage
}

export default function AuthorsNote( { page }: Props ) {
	if ( isContentEmpty( page ) ) {
		return <></>;
	}

	const date = new Date( page.modified );

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
