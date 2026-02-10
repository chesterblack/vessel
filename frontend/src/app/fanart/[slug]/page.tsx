import { getPost } from "@/lib/data-fetching";
import { SluggedPageProps } from "@/types/types";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import { notFound } from "next/navigation";

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
			<h1>{ pageData.title.rendered }</h1>
			<div className="fanart-image">
				<Image
					src={ pageImage.url }
					alt={ pageImage.alt }
					width={ pageImage.width }
					height={ pageImage.height }
				/>
				{ creditName && (
					<p className="credit">
						Credit: { creditLink ? <a href={ creditLink } target="_blank" rel="noopener noreferrer">{ creditName }</a> : creditName }
					</p>
				) }
			</div>
		</main>
	);
}