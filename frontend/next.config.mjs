/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			new URL( `${ process.env.BACKEND_URL }/**` ),
			new URL( 'https://kipbite-assets.fra1.digitaloceanspaces.com/**' ),
		]
	}
};

export default nextConfig;
