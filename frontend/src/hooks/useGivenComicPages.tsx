import { ComicPage } from "@/types/wp-post-types";
import { useEffect, useState } from "react";

export default function useGivenComicPages( pages: Promise<ComicPage[]> ) {
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const [ loadedPages, setLoadedPages ] = useState<ComicPage[]>( [] );

	useEffect( () => {
		( async () => {
			const p = await pages;
			setLoadedPages( p );
			setIsLoading( false );
		} )()
	}, [ pages ] );

	return { isLoading, loadedPages };
}