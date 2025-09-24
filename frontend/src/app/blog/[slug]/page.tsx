import { Post } from '@/types/wp-post-types';

import { cache } from 'react';
import parse from 'html-react-parser';
import { sendApiRequest } from '@/lib/utilities';
import JsonLdSchema from '@/components/JsonLdSchema';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getYoastMetadata } from '@/lib/seo';
import Image from 'next/image';
import { Author } from '@/types/types';

import "@/styles/blog.scss";
import AuthorImage from '@/components/AuthorImage';

export interface Props {
	params: Promise<{ slug: string }>
}

const getBlogPost = cache( async ( slug: string ) => {
	return await sendApiRequest(
		'GET',
		'wp/v2/posts',
		{ slug: slug, _embed: true }
	).then( d => d[0] ) as Post;
} );

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

	const title   = blogPost.title;
	const content = parse( blogPost.content.rendered );
	const schema  = blogPost.yoast_head_json.schema;
	const author  = blogPost._embedded.author[0] as Author;
	const date    = new Date( blogPost.modified );

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<link rel='stylesheet' type='text/css' href={`${ process.env.BACKEND_URL }/wp-includes/css/dist/block-library/style.min.css`} precedence='low' />

			<main className='blog-single'>
				<h1>{ title.rendered }</h1>
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