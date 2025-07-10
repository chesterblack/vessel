import '@/styles/characters.scss';
import CharacterInfo from "@/components/CharacterInfo";
import { sendApiRequest } from "@/lib/utilities";
import { Character } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>
}

export default async function CharacterPage( { params }: Props ) {
	const { slug } = await params;

	const characterData = await sendApiRequest(
		'GET',
		'wp/v2/character',
		{ slug: slug }
	).then( d => d[0] ) as Character;

	if ( ! characterData ) {
		notFound();
	}

	const chapterData = await sendApiRequest( 'GET', 'wp/v2/chapters' ) as Chapter[];

	return (
		<main className="character">
			<h1>{ characterData.title.rendered }</h1>
			<CharacterInfo chapters={ chapterData } character={ characterData } />
		</main>
	)
}