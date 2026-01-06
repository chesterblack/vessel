"use client"

import { signIn } from "next-auth/react"

interface Props {
	redirectTo: string
}

export default function SignIn( { redirectTo }: Props ) {
	return (
		<button className="discord-sign-in" onClick={ () => signIn( 'discord' ) }>
			Sign in with Discord
		</button>
	);
}
