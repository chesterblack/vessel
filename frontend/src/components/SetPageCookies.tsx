'use client'

import { setCookie } from "@/lib/utilities";

interface Props {
	chapter: string
};

export default function SetPageCookies( { chapter }: Props ) {
	setCookie( 'last-read-chapter', chapter );

	return null;
}