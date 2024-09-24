import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, children }) {
	const router = useRouter();
	let link = children;

	if (router.route == href) {
		link = <button className="active">{children}</button>;
	}

	return <Link href={href}>{link}</Link>;
}
