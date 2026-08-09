"use client"
import { signOut } from "next-auth/react"

/** Sign out button */
export function SignOut() {
	return (
		<button
			className="sign-in discord-sign-in"
			onClick={ () => signOut() }
			style={ {
				width: 'auto',
				margin: '25px auto 0'
			} }
		>
			Log out of Discord
		</button>
	)
}