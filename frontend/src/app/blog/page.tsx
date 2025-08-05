import { Post } from "@/types/wp-post-types";
import { Metadata } from "next";

import parse from 'html-react-parser';
import "@/styles/blog.scss";
import { blogDescription } from "@/lib/seo";
import { sendApiRequest } from "@/lib/utilities";


export const metadata: Metadata = {
	title: 'Blog | Vessel',
	description: blogDescription
}

export default async function BlogArchivePage() {
	const blogPosts = await sendApiRequest( 
		'GET',
		'wp/v2/posts'
	) as Post[];

	return (
		<>
			<main className="blog-archive">
				<h1>Blog</h1>
				<p>{ blogDescription }</p>

				<div className="blog-archive__list">
					{
						blogPosts.map( blog => (
							<a href={ `/blog/${ blog.slug }` } className="blog-link" key={ blog.id }>
								<span className="blog-link__date">
									{ new Date( blog.modified ).toDateString() }
								</span>
								<h4>
									{ blog.title.rendered }
								</h4>

								{ parse( blog.excerpt.rendered ) }
							</a>
						) )
					}
				</div>
			</main>
		</>
	)
}