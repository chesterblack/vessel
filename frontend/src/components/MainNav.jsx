import Link from "next/link";

export default function MainNav( { classes = '' } ) {
	return (
		<nav className={`main-nav ${ classes }`}>
		<Link href='/'>
			Read
		</Link>
		<Link href='/archive'>
			Archive
		</Link>
		<Link href='/characters'>
			Characters
		</Link>
		<Link href='/about'>
			About
		</Link>
		</nav>
	);
}