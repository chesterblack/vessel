import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";

import '@/styles/characters.scss';
import { cache } from "react";
import { notFound } from "next/navigation";
import { getFirstDescription, sendApiRequest } from "@/lib/utilities";
import { getYoastMetadata } from '@/lib/seo';
import CharacterInfo from "@/components/CharacterInfo";


interface Props {
	params: Promise<{ slug: string }>
}

const getCharacter = cache( async ( slug: string ) => {
	return await sendApiRequest(
		'GET',
		'wp/v2/character',
		{ slug: slug }
	).then( d => d[0] ) as Character;
} );

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
	const { slug } = await params;

	const characterData = await getCharacter( slug );

	return {
		...getYoastMetadata( characterData ),
		description: getFirstDescription( characterData )
	}
}

export default async function CharacterPage( { params }: Props ): Promise<ReactNode> {
	const { slug } = await params;

	const characterData = await getCharacter( slug );

	if ( ! characterData ) {
		notFound();
	}

	const chapterData = await sendApiRequest( 'GET', 'wp/v2/chapters' ) as Chapter[];

	return (
		<main className={`character ${ characterData.class_list.join(' ') }`}>
			<h1>{ characterData.title.rendered }</h1>
			<CharacterInfo chapters={ chapterData } character={ characterData } />
		</main>
	)
}