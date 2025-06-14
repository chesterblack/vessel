"use client"

import { useState } from "react";
import Link from "next/link";

import MainNav from "./MainNav";
import TextLogo from "./TextLogo";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
	const [ showNav, setShowNav ] = useState( false );

	return (
		<header>
			<Link href='/' className="header-logo">
				<TextLogo color='#fff' />
			</Link>
			<MainNav classes={ showNav ? 'show' : '' } />
			<HamburgerButton active={ showNav } callback={ setShowNav } />
		</header>
	);
}