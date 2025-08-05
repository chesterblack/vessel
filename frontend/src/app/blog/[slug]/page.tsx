import { Post } from '@/types/wp-post-types';

import { cache } from 'react';
import parse from 'html-react-parser';
import { sendApiRequest } from '@/lib/utilities';
import JsonLdSchema from '@/components/JsonLdSchema';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getYoastMetadata } from '@/lib/seo';

export interface Props {
	params: Promise<{ slug: string }>
}

const getBlogPost = cache( async ( slug: string ) => {
	return await sendApiRequest(
		'GET',
		'wp/v2/posts',
		{ slug: slug }
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
	
	const title = blogPost.title;
	const content = parse( blogPost.content.rendered );
	const schema = blogPost.yoast_head_json.schema;

	return (
		<>
			<JsonLdSchema schema={ schema } />
			<link rel='stylesheet' type='text/css' href={`${ process.env.BACKEND_URL }/wp-includes/css/dist/block-library/style.min.css`} precedence='low' />

			<main className='blog-single'>
				<h1>{ title.rendered }</h1>
				<div className="content">
					{ content }
				</div>
			</main>
		</>
	);
}