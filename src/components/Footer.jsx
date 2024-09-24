import SocialIcon from './SocialIcon';

export default function Footer() {
	const today = new Date();
	const year = today.getFullYear();

	return (
		<footer>
			<small className="copyright">
				&copy; Kip Benjamin {year}. All rights reserved.
			</small>
			<nav className="socials">
				<SocialIcon
					link="https://www.twitter.com/kipbite"
					socialType="Twitter"
					icon="https://placekitten.com/40/40"
				/>
				<SocialIcon
					link="https://www.kipbite.art"
					socialType="Website"
					icon="https://placekitten.com/40/40"
				/>
				<SocialIcon
					link="https://kipbite.storenvy.com"
					socialType="Store"
					icon="https://placekitten.com/40/40"
				/>
				<SocialIcon
					link="https://twitch.tv/kipbite"
					socialType="Twitch"
					icon="https://placekitten.com/40/40"
				/>
				<SocialIcon
					link="https://www.instagram.com/ipkipi"
					socialType="Instagram"
					icon="https://placekitten.com/40/40"
				/>
				<SocialIcon
					link="https://www.patreon.com/kipandkel"
					socialType="Patreon"
					icon="https://placekitten.com/40/40"
				/>
			</nav>
		</footer>
	);
}
