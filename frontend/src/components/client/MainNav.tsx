"use client"

import { useState } from "react";
import Link from "next/link";
import HamburgerButton from "../server/HamburgerButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import KofiLogo from "../../../public/kofi-logo.svg";


/** Main navigation menu */
export default function MainNav() {
	const [ showNav, setShowNav ] = useState( false );
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<>
			<nav className={ `main-nav ${ showNav ? 'show' : '' }` }>
				<Link className="nav-item" href='/' onClick={ () => setShowNav( false ) }>
					Read
				</Link>
				<Link className="nav-item" href='/archive' onClick={ () => setShowNav( false ) }>
					Archive
				</Link>
				<Link className="nav-item" href='/about' onClick={ () => setShowNav( false ) }>
					About
				</Link>
				<Link className="nav-item" href='/characters' onClick={ () => setShowNav( false ) }>
					Cast
				</Link>
				<Link className="nav-item" href='/blog' onClick={ () => setShowNav( false ) }>
					Blog
				</Link>
				<Link className="nav-item" href='/fanart' onClick={ () => setShowNav( false ) }>
					Fanart
				</Link>
				{ user &&
					<Link className="nav-item" href='/login'>
						<Image src={ user.image } width={ 50 } height={ 50 } alt={ `Logged in as ${ user.name }` } />
					</Link>
				}
				{ ! user &&
					<Link className="nav-item ko-fi" href='/login'>
						<Image src={ KofiLogo } alt="Ko-fi" width={ 50 } height={ 50 } />
						<div className="hover">
							Subscribe to the Ko-fi for early access!
						</div>
					</Link>
				}
			</nav>
			<HamburgerButton active={ showNav } callback={ setShowNav } />
		</>
	);
}