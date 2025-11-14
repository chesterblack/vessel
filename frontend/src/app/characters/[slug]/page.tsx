import JsonLdSchema from "@/components/JsonLdSchema";
import { getYoastMetadata } from "@/lib/seo";
import { getChapters } from "@/lib/data-fetching";
import { SluggedPageProps } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Inner from "./inner";
import { getCharacter } from "@/lib/data-fetching";

export async function generateMetadata( { params }: SluggedPageProps ): Promise<Metadata> {
	const { slug }      = await params;
	const characterData = await getCharacter( slug );

	if ( ! characterData ) {
		notFound();
	}

	return getYoastMetadata( characterData );
}

export default async function CharacterProfilePage( { params }: SluggedPageProps ) {
	const { slug }      = await params;
	const characterData = await getCharacter( slug );

	if ( ! characterData ) {
		notFound();
	}

	const chapterData = await getChapters();
	if ( ! chapterData ) {
		notFound();
	}

	const schema = characterData.yoast_head_json.schema;

	return (
		<main className={ `character ${ characterData.slug }` }>
			<JsonLdSchema schema={ schema } />
			<Inner
				character={ characterData }
				chapters={ chapterData }
			/>
		</main>
	);
}
