import Link from "next/link";

import MainNav from "./MainNav";
import TextLogo from "./TextLogo";

export default function Header() {
	return (
		<header>
			<Link href='/' className="header-logo">
				<TextLogo color='#fff' />
			</Link>
			<MainNav />
		</header>
	);
}