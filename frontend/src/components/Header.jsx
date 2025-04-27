import Link from "next/link";

export default function Header() {
	return (
		<header>
			<Link href='/'>
				VESSEL
			</Link>
			<nav>
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
		</header>
	);
}