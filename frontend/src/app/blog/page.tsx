import { Post } from "@/types/wp-post-types";
import { Metadata } from "next";

import "@/styles/blog.scss";
import { blogDescription } from "@/lib/seo";
import { sendApiRequest } from "@/lib/utilities";
import BlogListing from "@/components/BlogListing";


export const metadata: Metadata = {
	title: 'Blog | Vessel',
	description: blogDescription
}

export default async function BlogArchivePage() {
	const blogPosts = await sendApiRequest( 
		'GET',
		'wp/v2/posts',
		{ _embed: true }
	) as Post[];

	return (
		<>
			<main className="blog-archive">
				<h1>Blog</h1>
				<p>{ blogDescription }</p>

				<div className="blog-archive__list">
					{
						blogPosts.map( blog => (
							<BlogListing blogData={ blog } key={ blog.id } />
						) )
					}
				</div>
			</main>
		</>
	)
}