import Link from "next/link";
import TextLogo from "./TextLogo";

export default function Header() {
	return (
		<header>
			<Link href='/' className="header-logo">
				<TextLogo color='#fff' />
			</Link>
			<nav className="main-nav">
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