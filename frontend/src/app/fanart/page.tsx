import parse from 'html-react-parser';
import { getPosts } from "@/lib/data-fetching";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import Link from "next/link";

import '@/styles/fanart.scss';


export default async function FanartArchivePage() {
	const allFanart = await getPosts( 'fanart', { _embed: true } ) as Post[];

	return (
		<main className="fanart-archive">
			<h1>Fanart</h1>
			<p>
				Here&apos;s a selection of all the amazing fanart you&apos;ve done for Vessel! If you&apos;d like to be added to this page, send it in <a href="https://discord.gg/djwnBvFEd" target='_blank'>the Discord</a>!
			</p>
			<div className="fanart-grid">
				{ allFanart.map( ( fanart, i ) => {
					const attributes = fanart.content_blocks?.[0]?.attrs;

					if ( ! attributes ) {
						return null;
					}

					const { pageImage, creditName } = attributes;

					return (
						<Link key={ fanart.id } href={ `/fanart/${ fanart.slug }` } className="fanart-piece">
							<div className="fanart-image-window">
								<Image
									src={ pageImage.url }
									alt={ pageImage.alt }
									width={ pageImage.width }
									height={ pageImage.height }
								/>
							</div>
							<div className="fanart-info">
								<div className="fanart-title">
									{ parse( fanart.title.rendered ) }
								</div>
								{ creditName && <div className="fanart-credit">by { creditName }</div> }
							</div>
						</Link>
					);
				} ) }
			</div>
		</main>
	);
}