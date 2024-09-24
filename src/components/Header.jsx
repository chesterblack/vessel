import { useState, useEffect } from 'react';
import NavItem from './NavItem';
import { getLatestPage } from '../lib/contentful';

export default function Header() {
	const [latestPage, setLatestPage] = useState(false);

	useEffect(() => {
		(async () => {
			let latestPage = await getLatestPage();
			console.log( 'latestPage: ', latestPage );
			setLatestPage(latestPage.fields.position);
		})()
	}, []);

	return (
		<header>
			<a href="/">
				<img src="/skin/vessel-temp-logo.png" alt="vessel" />
			</a>
			<nav>
				<NavItem href="/read" key="First">
					First
				</NavItem>
				{latestPage && (
					<NavItem href={`/read/${latestPage}`}>Latest</NavItem>
				)}
				<NavItem href="/archive" key="Archive">
					Archive
				</NavItem>
				<NavItem href="/about" key="About">
					About
				</NavItem>
				<NavItem href="/cast" key="Cast">
					Cast
				</NavItem>
				<NavItem href="/links" key="Links">
					Links
				</NavItem>
				<NavItem href="/feed" key="RSS">
					RSS
				</NavItem>
			</nav>
		</header>
	);
}
