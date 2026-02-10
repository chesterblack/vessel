import { getPosts } from "@/lib/data-fetching";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import Link from "next/link";

import '@/styles/fanart.scss';


export default async function FanartArchivePage() {
	const allFanart = await getPosts( 'fanart', { _embed: true } ) as Post[];

	const testImages = [
		"https://admin.vesselcomic.com/wp-content/uploads/2025/09/cass.png",
		"https://admin.vesselcomic.com/wp-content/uploads/2025/09/mica-sketches-chester.jpg",
		"https://admin.vesselcomic.com/wp-content/uploads/2025/09/vessel-icon.png",
		"https://admin.vesselcomic.com/wp-content/uploads/2026/01/00cover.png",
	];

	return (
		<main className="fanart-archive">
			<h1>Fanart</h1>
			<p>
				Here&apos;s a selection of all the amazing fanart you&apos;ve done for Vessel! If you&apos;d like to be added to this page, send it in the Discord!
			</p>
			<div className="fanart-grid">
				{ allFanart.map( ( fanart, i ) => {
					const attributes = fanart.content_blocks?.[0]?.attrs;
					console.log( 'attributes: ', attributes );

					if ( ! attributes ) {
						return null;
					}

					const { pageImage, creditName } = attributes;

					return (
						<Link key={ fanart.id } href={ `/fanart/${ fanart.slug }` } className="fanart-piece">
							<div className="fanart-image-window">
								<img src={ pageImage.sizes.medium.url } />
								{/* <Image
									src={ testImages[i] }
									alt={ pageImage.alt }
									width={ pageImage.width }
									height={ pageImage.height }
								/> */}
							</div>
							<div className="fanart-title">
								{ fanart.title.rendered }
								{ creditName && <div className="fanart-credit">by { creditName }</div> }
							</div>
						</Link>
					);
				} ) }
			</div>
		</main>
	);
}