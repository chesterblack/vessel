import Link from "next/link";
import MainNav from "../client/MainNav";
import TextLogo from "./svg/TextLogo";
import { SessionProvider } from "next-auth/react";

export default async function Header() {
	return (
		<SessionProvider>
			<header>
				<Link href='/' className='header-logo' aria-label='Vessel'>
					<TextLogo color='#fff' />
				</Link>
				<MainNav />
			</header>
		</SessionProvider>
	);
}