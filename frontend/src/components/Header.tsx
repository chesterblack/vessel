import Link from "next/link";
import MainNav from "./MainNav";
import TextLogo from "./TextLogo";
import { getUser } from "@/lib/users";
import LoggedInBanner from "./LoggedInBanner";

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
			{ user && <LoggedInBanner user={ user } /> }
		</>
	);
}