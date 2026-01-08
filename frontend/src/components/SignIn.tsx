"use client"

import { signIn } from "next-auth/react"
import DiscordIcon from "@/../public/discord-logo.svg"
import Image from "next/image";

interface Props {
	redirectTo?: string
}

export default function SignIn( { redirectTo = '/' }: Props ) {
	return (
		<button className="sign-in discord-sign-in" onClick={ () => signIn( 'discord', { redirectTo } ) }>
			<Image src={ DiscordIcon } alt="Discord" width={ 20 } height={ 20 } /> Sign in with Discord
		</button>
	);
}
