import { WP_REST_API_Taxonomy } from "wp-types";

export type Chapter = WP_REST_API_Taxonomy & {
	id: number
	count: number
}
