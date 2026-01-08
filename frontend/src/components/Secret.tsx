import '@/styles/secret.scss';
import SignIn from "./SignIn";
import { User } from "next-auth";
import LockIcon from './LockIcon';

interface Props {
	redirectUrl?: string
	user?: { roles: string[] } & User
}

export default async function Secret( { redirectUrl, user }: Props ) {
	return (
		<main className="secret">
			<h1>
				<LockIcon width={ 40 } height={ 40 } />
				<span>That&apos;s a secret!</span>
			</h1>

			{ ! user &&
				<>
					<p>Subscribe to the <a href="https://ko-fi.com/kipbite" target="_blank">Ko-fi</a> and <a href="https://ko-fi.com/Discord/Settings" target="_blank">link it to your Discord account</a> in order to unlock access to this a month early! Otherwise, check back soon for the public release.</p>
					<hr />
					<p>Already done that? Sign in with Discord below to unlock this page!</p>
				</>
			}

			{ user &&
				<>
					<p>You&apos;re already logged in but we can&apos;t see that you&apos;ve got the right Discord role to get early access. Double-check that you have:
					</p>
					<ul>
						<li><a href="https://ko-fi.com/kipbite" target="_blank">
							Subscribed to the Ko-fi
						</a></li>
						<li><a href="https://ko-fi.com/Discord/Settings" target="_blank">
							Linked your Discord and Ko-fi accounts
						</a></li>
					</ul>
					<p>If you&apos;ve previously logged in here before you subscribed to the Ko-fi and have since subbed, try logging in again by clicking below.</p>
					<p>If it&apos;s <em>still</em> not working and you think it should be, fear not! You can still read the pages early on the <a href="https://ko-fi.com/kipbite" target="_blank">Ko-fi page itself</a>. Please ping Chester an email at <a href="mailto:webmaster@kipbite.com" target="_blank">webmaster@kipbite.com</a> too though, so he can look into why it&apos;s not working.</p>
				</>
			}
			<SignIn redirectTo={ redirectUrl } />
		</main>
	);
}