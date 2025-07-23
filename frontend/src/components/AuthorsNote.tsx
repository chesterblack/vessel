import { ComicPage } from '@/types/wp-post-types';
import parse from 'html-react-parser';
import Image from 'next/image';

interface Props {
	page: ComicPage
}

export default function AuthorsNote( { page }: Props ) {
	if ( ! page.content || page.content.rendered === '' ) {
		return <></>;
	}

	const date = new Date( page.modified );

	return (
		<div className="authors-note">
			<Image
				src="https://admin.vesselcomic.com/wp-content/uploads/2025/07/kipicon.png"
				width={ 100 }
				height={ 100 }
				alt="Kipbite"
			/>
			<div>
				<span className='date'>
					{ `${ date.toDateString() }, ${ date.toLocaleTimeString() }` }
				</span>
				{ parse( page.content.rendered ) }
			</div>
		</div>
	);
}
