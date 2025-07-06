import { Graph } from "schema-dts";

interface Props {
	schema: Graph
}

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