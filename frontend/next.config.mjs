/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	images: {
		remotePatterns: [
			new URL( `${ process.env.BACKEND_URL }/**` ),
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1234',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/**',
			},
			new URL( 'http://localhost:1234/**' ),
			new URL( 'http://localhost:3000/**' ),
			new URL( 'https://admin.vesselcomic.com/**' ),
			new URL( 'https://kipbite-assets.fra1.digitaloceanspaces.com/**' ),
			new URL( 'https://cdn.discordapp.com/**' )
		]
	}
};

export default nextConfig;
