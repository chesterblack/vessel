import { getChapters } from "@/lib/data-fetching";
import { getArrayOverlap, getChapterPages } from "@/lib/utilities";
import { ChapterPageData } from "@/types/types";
import { Character, ComicPage } from "@/types/wp-post-types";
import { Chapter } from "@/types/wp-taxonomies";
import { useEffect, useState } from "react";

export default function useCharacterAppearances( character: Character ) {
	const [ pageData, setPageData ] = useState<ChapterPageData[]>( [] );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );

	useEffect( () => {
		( async() => {
			setIsLoading( true );
			const chapters = await getChapters() ?? [];
		
			let tempPageData: ChapterPageData[] = [];
		
			for ( let i = 0; i < chapters.length; i++ ) {
				const chapter = chapters[i];
		
				const chapterPages = await getChapterPages( chapter );
				const chapterPageIds = chapterPages.map( page => page.id );
				const appearancesPageIds = getArrayOverlap( chapterPageIds, character.meta.comic_pages ?? [] );

				const appearancesPages = chapterPages.filter( page => appearancesPageIds.includes( page.id ) );

				tempPageData.push( {
					chapter: chapter,
					pages: appearancesPages
				} );
			}

			setPageData( tempPageData );
			setIsLoading( false );
		} )();
	}, [ character.meta.comic_pages ] );

	return { isLoading, pageData };
}