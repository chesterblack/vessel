/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	images: {
		remotePatterns: [
			new URL( `${ process.env.BACKEND_URL }/**` ),
			new URL( 'https://admin.vesselcomic.com/**' ),
			new URL( 'http://localhost:1234/**' ),
			new URL( 'https://kipbite-assets.fra1.digitaloceanspaces.com/**' ),
		]
	}
};

export default nextConfig;
