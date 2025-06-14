import Header from "@/components/Header";
import "./globals.scss";
import { sendApiRequest } from "@/lib/utilities";
import Image from "next/image";

export const metadata = {
  title: "Vessel",
  description: "",
};

export default async function RootLayout( { children } ) {
	const faviconUrl = await sendApiRequest( 'GET', 'vessel/v1/icon' ) ?? 'https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/cropped-vessel-icon-round-150x150.png';

	return (
		<html lang="en">
			<head>
				<link rel="icon" href={ faviconUrl } sizes="any" />
			</head>
			<body>
				<Image
					src='https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/temp-banner.png'
					width={150}
					height={239}
					alt="The Vessel"
				/>
				<h1>Coming soon...</h1>
				{/* <Header />
				{ children } */}
			</body>
		</html>
	);
}
