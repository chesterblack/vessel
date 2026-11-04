import { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { ReactElement, useState } from "react";
import { Graph } from "schema-dts";
import { Character, ComicPage } from "./wp-post-types";
import { User } from "next-auth";
import { Chapter } from "./wp-taxonomies";

export type Children = ReactElement | string | ( string | ReactElement )[];

export type NumericalString = `${ number }` | number;

export type PageNumber = number | NumericalString | 'latest';


export type SluggedPageProps = { params: Promise<{ slug: string }> };

export type ImageSize = {
	height: number
	width: number
	url: string
	orientation: 'portrait'|'landscape'
};

export type Image = {
	url: string
	alt: string
	width: number
	height: number
	sizes: Record<string, ImageSize>
}

export type YoastHead = {
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

export type OgImage = {
	url: string,
	type: string,
	width: string,
	height: string,
}

export type Author = {
	description: string
	id: number
	link: string
	name: string
	slug: 'kip'|'chester'
}

export type HeadingLevel = 1|2|3|4|5|6;

export type ComicIndex = {
	slug: string
	title: string
	page_number: number
	role_locks: string[]
}

export type ComicIndexWithLock = ComicIndex & { locked: boolean }

export type ComicReaderData = {
	current: ComicPage
	latest: ComicIndex
	indexes: ComicIndex[]
}

export type UserWithRoles = {
	roles: string[];
} & User


export type ChapterPageData = {
	chapter: Chapter,
	pages: ComicPage[]
}
