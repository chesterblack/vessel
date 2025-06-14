/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			new URL( `${ process.env.BACKEND_URL }/**` ),
			new URL( 'https://kipbite-assets.fra1.digitaloceanspaces.com/**' ),
		]
	},
	async headers() {
		return [
			{
				source: '/:page*',
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=86400, stale-while-revalidate=604800'
					},
					{
						key: 'test-header',
						value: 'please'
					}
				]
			}
		]
	}
};

export default nextConfig;
