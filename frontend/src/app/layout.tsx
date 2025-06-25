import { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/global.scss";
import ComingSoon from "@/components/ComingSoon";
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode[]
}

export const metadata: Metadata = {
	title: 'Vessel',
	description: '',
};

export default async function RootLayout( { children }: Props ) {
	if ( process.env.COMING_SOON !== 'false' ) {
		return <ComingSoon />;
	}

	const faviconUrl = 'https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/cropped-vessel-icon-round-150x150.png';

	return (
		<html lang="en">
			<head>
				<link rel="icon" href={ faviconUrl } sizes="any" />
				<link rel="preconnect" href={ process.env.BACKEND_URL } />
			</head>
			<body>
				<Header />
				{ children }
				<Footer />

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
