import Link from "next/link";
import SocialLinks from "./SocialLinks";
import PolicyLinks from "./PolicyLinks";

export default function Footer() {
	return (
		<>
			<div className="footer-spacer"></div>
			<footer>
				<SocialLinks />
				<div className="feedback-link">
					Got feedback? <Link href='/contact'>Get in touch!</Link>
				</div>
				<hr />
				<PolicyLinks />
			</footer>
		</>
	);
}