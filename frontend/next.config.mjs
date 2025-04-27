/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [ new URL( `${ process.env.BACKEND_URL }/**` ) ]
	}
};

export default nextConfig;
