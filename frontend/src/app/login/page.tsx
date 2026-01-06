'use client'

import SignIn from "@/components/SignIn";
import { SessionProvider } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
	const params = useSearchParams();
	const redirectTo = params.get( 'redirectTo' );

	const redirectUrl = redirectTo ?? '/';

	return (
		<SessionProvider>
			<main>
				<h1>That&apos;s a secret!</h1>
				<p>Subscribe to the ko-fi and link it to your Discord account in order to unlock access to this early! Or, you can wait a month and it&apos;ll be released to everyone.</p>
				<p>Already done that? Sign in with Discord below to unlock this page!</p>
				<SignIn redirectTo={ redirectUrl } />
			</main>
		</SessionProvider>
	);
}