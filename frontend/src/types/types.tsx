import { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { ReactElement } from "react";
import { Graph } from "schema-dts";

export type Children = ReactElement | string | ( string | ReactElement )[];

export type NumericalString = `${ number }` | number;

export type PageNumber = number | NumericalString | 'latest';

export type ImageSize = [ number, number ] | number;

export type SluggedPageProps = { params: Promise<{ slug: string }> };

export interface YoastHead {
	title: string,
	robots: Robots,
	canonical: string,
	og_locale: string,
	og_type: string,
	og_title: string,
	og_description: string,
	og_url: string,
	og_site_name: string,
	article_modified_time: string,
	og_image: OgImage[],
	twitter_card: string,
	schema: Graph,
};

export interface OgImage {
	url: string,
	type: string,
	width: string,
	height: string,
}

export interface Author {
	description: string
	id: number
	link: string
	name: string
	slug: string
}