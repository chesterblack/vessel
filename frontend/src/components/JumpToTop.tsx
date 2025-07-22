'use client'

import { useEffect } from "react";

export default function JumpToTop() {
	useEffect( () => {
		window.scroll(0, 0);
	}, [] );

	return <></>;
}