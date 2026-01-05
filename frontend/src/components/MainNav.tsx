"use client"

import { useState } from "react";
import Link from "next/link";
import HamburgerButton from "./HamburgerButton";
import SignIn from "./SignIn";


export default function MainNav() {
	const [ showNav, setShowNav ] = useState( false );

	return (
		<>
			<nav className={ `main-nav ${ showNav ? 'show' : '' }` }>
				<Link href='/' onClick={ () => setShowNav( false ) }>
					Read
				</Link>
				<Link href='/archive' onClick={ () => setShowNav( false ) }>
					Archive
				</Link>
				{/* <Link href='/characters' onClick={ () => setShowNav( false ) }>
					Characters
				</Link> */}
				<Link href='/blog' onClick={ () => setShowNav( false ) }>
					Blog
				</Link>
				<Link href='/about' onClick={ () => setShowNav( false ) }>
					About
				</Link>
			</nav>
			<HamburgerButton active={ showNav } callback={ setShowNav } />
		</>
	);
}