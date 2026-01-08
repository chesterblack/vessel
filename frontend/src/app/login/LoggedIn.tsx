import { SignOut } from "@/components/SignOut";
import { User } from "next-auth";

interface Props {
	user: User
};

export default function LoggedIn( { user }: Props ) {
	return (
		<>
			<h1>You&apos;re already logged in</h1>
			<p>
				You&apos;re logged in to Discord as { user.name }. If you&apos;d like to log out, click the button below.
			</p>
			<SignOut />
		</>
	);
}