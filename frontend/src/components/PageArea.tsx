import { getImageProps } from "@/lib/utilities";
import Image from "next/image";
import Link from "next/link";

export default function PageArea( { pageData, pageNumber, canGoBack, canGoForward } ) {
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