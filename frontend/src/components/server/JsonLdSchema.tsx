import { Graph } from "schema-dts";

type Props = {
	schema: Graph
}

/** A JSON+LD schema piece for SEO purposes, accepts an object that gets stringified */
export default function JsonLdSchema( { schema }: Props ) {
	return (
		<script
			type="application/json"
			dangerouslySetInnerHTML={ {
				__html: JSON.stringify( schema ).replace( /</g, '\\u003c' )
			} }
		/>
	)
}