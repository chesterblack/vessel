import JsonLdSchema from "@/components/JsonLdSchema";
import { getYoastMetadata } from "@/lib/seo";
import { getChapters, sendApiRequest } from "@/lib/utilities";
import { SluggedPageProps } from "@/types/types";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Inner from "./inner";

export async function generateMetadata( { params }: SluggedPageProps ): Promise<Metadata> {
	const { slug } = await params;

	const characterData = await sendApiRequest(
		'GET',
		'wp/v2/character',
		{ slug: slug }
	) as Character[];

	if ( ! characterData ) {
		notFound();
	}

	return getYoastMetadata( characterData[0] );
}

export default async function CharacterProfilePage( { params }: SluggedPageProps ) {
	const { slug } = await params;

	const characterData = await sendApiRequest(
		'GET',
		'wp/v2/character',
		{ slug: slug }
	) as Character[];

	if ( ! characterData ) {
		console.error( "not found characterData" );
		notFound();
	}

	const chapterData = await getChapters();
	if ( ! chapterData ) {
		console.error( "not found chapterData" );
		notFound();
	}

	const character = characterData[0];
	const schema = character.yoast_head_json.schema;

	return (
		<main className={ `character ${ character.title.rendered }` }>
			<JsonLdSchema schema={ schema } />
			<Inner
				character={ character }
				chapters={ chapterData }
			/>
		</main>
	);
}
