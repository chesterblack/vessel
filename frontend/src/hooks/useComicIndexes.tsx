'use client'

import { getPageIndexes } from "@/lib/data-fetching";
import { ComicIndex } from "@/types/types";
import { useEffect, useState } from "react";

export default function useComicIndexes(currentPageNumber: number) {
	const [ isLoading, setIsLoading ] = useState<boolean>(true);
	const [ pageIndexes, setPageIndexes ] = useState<ComicIndex[]>([]);

	useEffect( () => {
		( async () => {
			const response = await getPageIndexes(currentPageNumber);
			if ( response && response.length > 0 ) {
				setPageIndexes( response );
				setIsLoading( false );
			}
		} )();
	}, [] );

	return { isLoading, pageIndexes };
}