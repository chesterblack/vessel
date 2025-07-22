import Link from "next/link";

export default function SocialLinks() {
	return (
		<div className='social-links'>
			<h4>Follow Kip!</h4>
			<nav>
				<Link href='https://bsky.app/profile/kipbite.com' target='_blank'>Bluesky</Link>
				<Link href='https://twitch.tv/kipbite' target='_blank'>Twitch</Link>
				<Link href='https://www.tiktok.com/@kipbite' target='_blank'>TikTok</Link>
				<Link href='https://vgen.co/kipbite' target='_blank'>VGen</Link>
			</nav>
		</div>
	);
}