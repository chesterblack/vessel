import Link from "next/link";

export default function SocialLinks() {
	return (
		<div className='social-links'>
			<h4>Follow Kip!</h4>
			<nav>
				<Link href='https://www.ko-fi.com/kipbite' target='_blank' rel='noopener'>Ko-fi</Link>
				<Link href='https://discord.gg/yumrqhvCHD' target='_blank' rel='noopener'>Discord</Link>
				<Link href='https://bsky.app/profile/kipbite.com' target='_blank' rel='noopener'>Bluesky</Link>
				<Link href='https://www.twitch.tv/kipbite' target='_blank' rel='noopener'>Twitch</Link>
				<Link href='https://www.tiktok.com/@kipbite' target='_blank' rel='noopener'>TikTok</Link>
				<Link href='https://vgen.co/kipbite' target='_blank' rel='noopener'>VGen</Link>
			</nav>
		</div>
	);
}