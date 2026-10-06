import { KeyMap } from "../types";

export function setMeta<M, K extends keyof M>(
	key: K,
	data: M[K],
	meta: M,
	updateMeta: Function
) {
	const newValue = {...meta};
	newValue[key] = data;

	updateMeta({...newValue});
}

export function copyLegacyAttributes(
	attributes: any,
	keyMap: KeyMap<typeof meta, typeof attributes>,
	meta: any,
	updateMeta: Function
) {
	for ( const keys of keyMap ) {
		const [ metaKey, attrKey ] = keys;
		const metaValue = meta[ metaKey ];
		const attrValue = attributes[ attrKey ];

		if ( ( !metaValue || (
			typeof metaValue === 'object' &&
			'length' in metaValue &&
			metaValue.length === 0
		) ) && attrValue ) {
			setMeta( metaKey, attrValue, meta, updateMeta );
		}
	}
}