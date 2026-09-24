"use client"

import { hasCookie, setCookie } from "@/lib/utilities";
import Image from "next/image";
import { useState } from "react";

/** Big ko-fi banner that can be closed for 30 days */
export default function SubscribeBanner() {
	const [ open, setOpen ] = useState( true );

	const closedCookie = hasCookie( 'kofi-banner-closed' );

	if ( !open || closedCookie ) { return }

	function handleClose() {
		setOpen( false );
		setCookie( 'kofi-banner-closed', 'true',  )
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