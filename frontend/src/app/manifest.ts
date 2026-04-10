import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
	return {
		id: "vesselcomic",
		name: "Read Vessel",
		short_name: "Vessel",
		description: "A medieval fantasy webcomic about a man on a journey to deliver a world-healing vessel of magic to a powerful mage. Who is this mage? He doesn't really know yet. Where are they? That's also up in the air. Does he want to do this? Not really.",
		icons: [
			{
				src: `${ process.env.NEXT_PUBLIC_FRONTEND_URL }/vessel-icon-512.png`,
				type: "image/png",
				sizes: "512x512",
				purpose: "any"
			},
			{
				src: `${ process.env.NEXT_PUBLIC_FRONTEND_URL }/vessel-icon-512.png`,
				type: "image/png",
				sizes: "512x512",
				purpose: "any"
			},
			{
				src: `${ process.env.NEXT_PUBLIC_FRONTEND_URL }/vessel-icon-192.png`,
				type: "image/png",
				sizes: "192x192",
				purpose: "any"
			},
			{
				src: `${ process.env.NEXT_PUBLIC_FRONTEND_URL }/vessel-icon-maskable.png`,
				type: "image/png",
				sizes: "855x855",
				purpose: "maskable"
			}
		],
		background_color: "#0B101C",
		categories: [ "books" ],
		display: "minimal-ui",
		orientation: "portrait",
		start_url: process.env.NEXT_PUBLIC_FRONTEND_URL,
		theme_color: "#0B101C",
		prefer_related_applications: false
	}
}