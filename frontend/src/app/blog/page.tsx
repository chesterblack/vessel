import { Metadata } from "next";

import "@/styles/blog.scss";
import { blogDescription } from "@/lib/seo";
import BlogListing from "@/components/BlogListing";
import { getBlogPosts } from "@/lib/data-fetching";


export const metadata: Metadata = {
	title: 'Blog | Vessel',
	description: blogDescription
}

export default async function BlogArchivePage() {
	const blogPosts = await getBlogPosts();

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