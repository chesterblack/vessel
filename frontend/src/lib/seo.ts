import { WebPage } from "@/types/wp-post-types";
import { Metadata } from "next";


export function getYoastMetadata( pageData: WebPage ): Metadata {
	if ( ! pageData ) {
		return {};
	}

	const yoastJson = pageData.yoast_head_json;

	if ( ! yoastJson ) {
		const { title, excerpt } = pageData;

		return {
			title: `${ title.rendered } - Vessel`,
			description: excerpt.rendered
		}
	}

	return {
		title: yoastJson.og_title,
		description: yoastJson.og_description,
		robots: yoastJson.robots,
		openGraph: {
			title: yoastJson.og_title,
			description: yoastJson.og_description,
			url: yoastJson.og_url,
			siteName: yoastJson.og_site_name,
			images: yoastJson.og_image,
			locale: yoastJson.og_locale,
		},
	}
}

export const blogDescription = "Keep up to date with the development of Vessel here. Get behind-the-scenes looks at progress, sketches and more!";
