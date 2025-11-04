import { WP_REST_API_Taxonomy } from "wp-types";

export interface Chapter extends WP_REST_API_Taxonomy {
	id: number
	count: number
}
