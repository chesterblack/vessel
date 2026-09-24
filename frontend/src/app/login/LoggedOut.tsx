import SignIn from "@/components/client/SignIn";
import Image from "next/image";
import Link from "next/link";
import KofiLogo from "../../../public/kofi-logo.svg";

export default function LoggedOut() {
	return (
		<>
			<h1>Subscribe for early access!</h1>
			<p>
				Subscribe to the Ko-fi to get access to pages up to a month before everyone else!
			</p>
			<p>
				Once you&apos;ve subscribed, make sure to link your Discord account to your Ko-fi account, then login to Discord below to get access.
			</p>

			<div className="sign-in-buttons">
				<Link href="https://www.ko-fi.com/kipbite" target="_blank" className="sign-in kofi-sign-in">
					<Image src={ KofiLogo } alt="Ko-fi" width={ 20 } height={ 20 } />
					<span>
						Support me on Ko-fi
					</span>
				</Link>
				<SignIn />
			</div>
		</>
	);
}