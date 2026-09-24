import JsonLdSchema from "@/components/server/JsonLdSchema";
import { getYoastMetadata } from "@/lib/seo";
import { getChapters } from "@/lib/data-fetching";
import { SluggedPageProps } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Inner from "./inner";
import { getCharacter } from "@/lib/data-fetching";
import "@/styles/characters.scss";
import { cookies } from "next/headers";

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
	const cookieStore = await cookies();

	if ( ! characterData ) {
		notFound();
	}

	const chapterData = await getChapters();
	if ( ! chapterData ) {
		notFound();
	}

	const defaultChapter = cookieStore.get('last-read-chapter')?.value ?? chapterData[0].slug;
	const schema = characterData.yoast_head_json.schema;

	return (
		<main className={ `character ${ characterData.slug }` }>
			<JsonLdSchema schema={ schema } />
			<Inner
				character={ characterData }
				chapters={ chapterData }
				defaultChapter={ defaultChapter }
			/>
		</main>
	);
}
