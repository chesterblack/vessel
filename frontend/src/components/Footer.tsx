import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer() {
	return (
		<>
			<div className="footer-spacer"></div>
			<footer>
				<SocialLinks />
				<div>Got feedback? <Link href='/contact'>Get in touch!</Link></div>
			</footer>
		</>
	);
}