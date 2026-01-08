import { getUser } from "@/lib/users";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

export default async function LoginPage() {
	const user = await getUser();

	return (
		<main className="login">
			{ user && <LoggedIn user={ user } /> }
			{ ! user && <LoggedOut /> }
		</main>
	);
}