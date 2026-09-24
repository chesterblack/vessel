import { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/global.scss";
import Header from "@/components/server/Header";
import Footer from '@/components/server/Footer';

export const metadata: Metadata = {
	title: 'Vessel',
	description: 'A medieval fantasy webcomic about a man on a journey to deliver a world-healing vessel of magic to a powerful mage. Who is this mage? He doesn\'t really know yet. Where are they? That\'s also up in the air. Does he want to do this? Not really.',
	icons: 'https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/cropped-vessel-icon-round-150x150.png',
	openGraph: {
		type: "website",
		url: "https://vesselcomic.com",
		title: "Vessel",
		description: "A medieval fantasy webcomic about a man on a journey to deliver a world-healing vessel of magic to a powerful mage. Who is this mage? He doesn\'t really know yet. Where are they? That\'s also up in the air. Does he want to do this? Not really.",
		siteName: "Vessel",
		images: [{ url: "https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/opengraph-image.jpg" }]
	}
};

export default function RootLayout( { children } ) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href={ process.env.BACKEND_URL } />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body>
				<Header />
				<div className='content-wrapper'>
					{ children }
					<Footer />
				</div>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
