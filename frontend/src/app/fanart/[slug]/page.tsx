import { getPost } from "@/lib/data-fetching";
import { SluggedPageProps } from "@/types/types";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';

import '@/styles/fanart.scss';


export default async function FanartPage( { params }: SluggedPageProps ) {
	const { slug } = await params;
	const pageData = await getPost( 'fanart', slug ) as Post;

	if ( ! pageData ) {
		notFound();
	}

	const attributes = pageData.content_blocks?.[0]?.attrs;

	if ( ! attributes ) {
		notFound();
	}

	const { pageImage, creditName, creditLink } = attributes;

	return (
		<main className="fanart-page">
			<div className="fanart-single-title">
				<h1>{ pageData.title.rendered }</h1>
				{ creditName && (
					<p className="fanart-single-credit">
						by { creditLink ? <a href={ creditLink } target="_blank" rel="noopener noreferrer">{ creditName }</a> : creditName }
					</p>
				) }
			</div>
			<Image
				src={ pageImage.url }
				alt={ pageImage.alt }
				width={ pageImage.width }
				height={ pageImage.height }
				className="fanart-image"
			/>
			{ parse( pageData.content.rendered ) }
		</main>
	);
}