import Link from "next/link";

interface Props {
	
};

export default function PolicyLinks( {  }: Props ) {
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