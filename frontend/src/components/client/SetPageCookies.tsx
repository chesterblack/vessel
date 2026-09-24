'use client'

import { setCookie } from "@/lib/utilities";

type Props = {
	chapter: string
};

/** Sets the last-read-chapter cookie for the given chapter */
export default function SetPageCookies( { chapter }: Props ) {
	setCookie( 'last-read-chapter', chapter );

	return null;
}