import Image from "next/image";

export default function ComingSoon({}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href='https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/cropped-vessel-icon-round-150x150.png' sizes="any" />
			</head>
			<body className="coming-soon">
				<Image
					src='https://kipbite-assets.fra1.digitaloceanspaces.com/vessel/temp-banner.png'
					width={150}
					height={239}
					alt="The Vessel"
				/>
				<h1>Coming soon...</h1>
			</body>
		</html>
	);
}