import Link from "next/link";

export default function Button( { link, onClick, disabled, children } ) {
	return link ?
		<Link href={ link } className='button' onClick={ onClick } disabled={ disabled }>
			{ children }
		</Link> :
		<button className='button' onClick={ onClick } disabled={ disabled }>
			{ children }
		</button>
}