import parse from 'html-react-parser';
import JsonLdSchema from '@/components/server/JsonLdSchema';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getYoastMetadata } from '@/lib/seo';
import { Author } from '@/types/types';

import "@/styles/blog.scss";
import AuthorImage from '@/components/server/AuthorImage';
import { getBlogPost } from '@/lib/data-fetching';

export type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	const { slug } = await params;
	const blogPost = await getBlogPost( slug );

	if ( ! blogPost ) {
		notFound();
	}

	return getYoastMetadata( blogPost );
}

export default async function BlogPostPage( { params }: Props ) {
	const { slug } = await params;
	
	const blogPost = await getBlogPost( slug );

	if ( ! blogPost ) {
		notFound();
	}

	const title   = parse( blogPost.title.rendered );
	const content = parse( blogPost.content.rendered );
	const schema  = blogPost.yoast_head_json.schema;
	const author  = blogPost._embedded.author[0] as Author;
	const date    = new Date( blogPost.date );

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<link rel='stylesheet' type='text/css' href={`${ process.env.BACKEND_URL }/wp-includes/css/dist/block-library/style.min.css`} precedence='low' />

			<main className='blog-single'>
				<h1>{ title }</h1>
				<div className="content">
					{ content }
				</div>
				<div className='author'>
					<div>
						<h3>
							{ author.name }
						</h3>
						<span className='date'>
							{ `${ date.toDateString() }, ${ date.toLocaleTimeString() }` }
						</span>
					</div>
					<AuthorImage author={ author } size={ 100 } />
				</div>
			</main>
		</>
	);
}