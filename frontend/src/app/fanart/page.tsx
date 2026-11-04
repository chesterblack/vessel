import parse from 'html-react-parser';
import { getPosts } from "@/lib/data-fetching";
import { Post } from "@/types/wp-post-types";
import Image from "next/image";
import Link from "next/link";
import { getAttribute } from '@/lib/utilities';
import { Image as ImageType } from '@/types/types';

import '@/styles/fanart.scss';


export default async function FanartArchivePage() {
	const allFanart = await getPosts( 'fanart', { _embed: true } ) as Post[];

	return (
		<main className="fanart-archive">
			<h1>Fanart</h1>
			<p>
				Here&apos;s a selection of all the amazing fanart you&apos;ve done for Vessel! If you&apos;d like to be added to this page, send it in the Discord <a href="https://discord.com/channels/830103888190242876/1128294898269954128" target='_blank'>fanart channel</a>, or DM it to Chester or Kip!
			</p>
			<div className="fanart-grid">
				{ allFanart.map( ( fanart, i ) => {
					const pageImage = getAttribute<ImageType>( fanart, 'pageImage' );
					const creditName = getAttribute<string>( fanart, 'creditName' );

					if ( ! pageImage ) {
						return null;
					}

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