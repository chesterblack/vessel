import { getImageProps } from "@/lib/utilities";
import { ComicPage } from "@/types/wp-post-types";
import Image from "next/image";
import Link from "next/link";


type Props = {
	pageData: ComicPage,
	pageNumber: number,
	canGoBack?: boolean,
	canGoForward?: boolean
}

/** The page image, including clickable areas for back and forward */
export default function PageArea( { pageData, pageNumber, canGoBack, canGoForward }: Props ) {
	const { src, width, height, alt } = getImageProps( pageData );

	return (
		<div className='page'>
			{ canGoBack &&
				<Link href={ `/page/${ pageNumber - 1 }` } className="page-area backward" />
			}

			<Image
				className='page-image'
				src={ src }
				width={ width }
				height={ height }
				alt={ alt }
				priority={ true }
				fetchPriority='high'
			/>

			{ canGoForward &&
				<Link href={ `/page/${ pageNumber + 1 }` } className="page-area forward" />
			}
		</div>
	);
}

export function Skeleton() {
	return (
		<div className="page placeholder-page">
			<div className="page-image"></div>
		</div>
	)
}