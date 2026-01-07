import Link from "next/link";
import MainNav from "./MainNav";
import TextLogo from "./TextLogo";
import { getUser } from "@/lib/users";
import LoggedInBanner from "./LoggedInBanner";
import KoFiBanner from "./KoFiBanner";

export default async function Header() {
	const user = await getUser();

	return (
		<>
			<header>
				<Link href='/' className='header-logo' aria-label='Vessel'>
					<TextLogo color='#fff' />
				</Link>
				<MainNav />
			</header>
			{ ! user && <KoFiBanner /> }
			{ user && <LoggedInBanner user={ user } /> }
		</>
	);
}