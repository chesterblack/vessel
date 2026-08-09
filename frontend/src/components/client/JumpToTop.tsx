'use client'

import { useEffect } from "react";

/** Causes any page this is placed on to automatically jump to the top on load */
export default function JumpToTop() {
	useEffect( () => {
		window.scroll(0, 0);
	}, [] );

	return null;
}