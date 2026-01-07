import { User } from "next-auth";
import Image from "next/image";
import { SignOut } from "./SignOut";

interface Props {
	user: User
};

export default function LoggedInBanner( { user }: Props ) {
	return (
		<div className="hanging-banner logged-in-banner">
			<Image src={ user.image } alt={ user.name } width={ 50 } height={ 50 } />
			<span>Logged in as { user.name }</span>

			<div className="hover">
				<SignOut />
			</div>
		</div>
	);
}