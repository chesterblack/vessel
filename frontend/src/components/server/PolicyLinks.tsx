import Link from "next/link";

export default function PolicyLinks() {
	return (
		<div className="social-links">
			<Link href='/privacy-policy'>
				Privacy Policy
			</Link>
			<Link href='/cookie-policy'>
				Cookie Policy
			</Link>
		</div>
	);
}