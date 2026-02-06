"use client"

import { useState } from "react";
import Link from "next/link";
import HamburgerButton from "./HamburgerButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import KofiLogo from "../../public/kofi-logo.svg";

export default function MainNav() {
	const [ showNav, setShowNav ] = useState( false );
	const { data: session } = useSession();
	const user = session?.user;

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
				{/* { user &&
					<Link href='/login' className="small">
						<Image src={ user.image } width={ 50 } height={ 50 } alt={ `Logged in as ${ user.name }` } />
					</Link>
				}
				{ ! user &&
					<Link href='/login' className="ko-fi small">
						<Image src={ KofiLogo } alt="Ko-fi" width={ 50 } height={ 50 } />
						<div className="hover">
							Subscribe to the Ko-fi for early access!
						</div>
					</Link>
				} */}
			</nav>
			<HamburgerButton active={ showNav } callback={ setShowNav } />
		</>
	);
}