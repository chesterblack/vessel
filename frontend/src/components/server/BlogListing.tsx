import { Author } from "@/types/types";
import { Post } from "@/types/wp-post-types"
import AuthorImage from "./AuthorImage";
import parse from 'html-react-parser';

type Props = {
	blogData: Post
}

/**
 * A link to a blog post with the title, date and author image
 */
export default function BlogListing( { blogData }: Props ) {
	const { slug, id, modified, _embedded, title } = blogData;
	const author = _embedded.author[0] as Author;

	return (
		<a href={ `/blog/${ slug }` } className="blog-link" key={ id }>
			<AuthorImage author={ author } size={ 75 } />

			<div>
				<span className="blog-link__date">
					{ new Date( modified ).toDateString() }
				</span>
				<h3>
					{ parse( title.rendered ) }
				</h3>
			</div>
		</a>
	)
}