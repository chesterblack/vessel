import Link from 'next/link';
import KofiLogo from '../../public/kofi-logo.svg';
import Image from "next/image";

/** Little popup that shows when hovering over login nav menu item */
export default function KoFiBanner() {
	return (
		<Link href="https://ko-fi.com/kipbite" target="_blank" className="hanging-banner kofi-banner">
			<Image src={ KofiLogo } alt='Ko-fi' width={ 50 } height={ 50 } />
			<span>Subscribe to the Ko-fi to get early access!</span>
		</Link>
	);
}