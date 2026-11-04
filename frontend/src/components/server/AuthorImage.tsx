import Image from "next/image";

type Props = {
	author: { slug: 'kip'|'chester', name: string }
	size: [ number, number ] | number;
}

export default function AuthorImage( { author, size }: Props ) {
	if ( typeof( size ) === 'number' ) {
		size = [ size, size ];
	}

	return(
		<Image
			src={ `https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/${ author.slug }-icon.png` }
			width={ size[0] }
			height={ size[1] }
			alt={ author.name }
		/>
	)
}