import { getPost } from "@/lib/data-fetching";
import { Image as ImageType, SluggedPageProps } from "@/types/types";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';

import '@/styles/fanart.scss';
import CharacterTags from "@/components/server/CharacterTags";
import { getAttribute } from "@/lib/utilities";


export default async function FanartPage( { params }: SluggedPageProps ) {
	const { slug } = await params;
	const pageData = await getPost( 'fanart', slug ) as Post;

	if ( ! pageData ) {
		notFound();
	}

	const pageImage  = getAttribute<ImageType>( pageData, 'pageImage' );
	const creditName = getAttribute<string>( pageData, 'creditName' );
	const creditLink = getAttribute<string>( pageData, 'creditLink' );
	const characters = getAttribute<number[]>( pageData, 'characters' );

	if ( ! pageImage ) {
		notFound();
	}

	return (
		<main className="fanart-page">
			<div className="fanart-single-title">
				<h1>{ parse( pageData.title.rendered ) }</h1>
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
			<CharacterTags characters={ characters } />
			{ parse( pageData.content.rendered ) }
		</main>
	);
}