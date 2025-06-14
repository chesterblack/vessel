import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "../styles/global.scss";

import { sendApiRequest } from "@/lib/utilities";
import ComingSoon from "@/components/ComingSoon";
import Header from "@/components/Header";

export const metadata = {
  title: "Vessel",
  description: "",
};

export default async function RootLayout( { children } ) {
	if ( process.env.COMING_SOON !== 'false' ) {
		return <ComingSoon />;
	}

	const faviconUrl = await sendApiRequest( 'GET', 'vessel/v1/icon' ) ?? 'https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/cropped-vessel-icon-round-150x150.png';

	return (
		<html lang="en">
			<head>
				<link rel="icon" href={ faviconUrl } sizes="any" />
			</head>
			<body>
				<Header />
				{ children }
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
