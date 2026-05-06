"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
	setCookie?: () => void
}

export default function SubscribeBanner( { setCookie }: Props ) {
	const [ open, setOpen ] = useState( true );
	const { data: session } = useSession();
	const user = session?.user;

	if ( typeof document === 'undefined' ) {
		return;
	}

	const closedCookie = document?.cookie.split(";").some( i => i.trim().startsWith("kofi-banner-closed="));

	if ( user || !open || closedCookie ) {
		return;
	}

	function handleClose() {
		const date = new Date();
		const time = date.getTime();
		const expireTime = time + 60000 * 60 * 24 * 30 // 30 days
		date.setTime(expireTime);

		setOpen( false );
		document.cookie = `kofi-banner-closed=true;expires=${ date.toUTCString() }`;
	}

	return (
		<div className="subscribe-banner">
			<button onClick={handleClose}>X</button>

			<a href="https://ko-fi.com/kipbite" target="_blank" className="kofi-banner">
					<Image
						src='/kofi-banner.png'
						alt="Read pages a month early! Click here!"
						width={ 860 }
						height={ 162 }
					/>
				</a>
		</div>
	);
}