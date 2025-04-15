import { RichText } from "@wordpress/block-editor";

export default function Description( { chapter, descriptions, setDescription } ) {
	let value = descriptions?.[chapter] ?? '';

	return (
		<RichText
			className='description'
			tagName='p'
			value={ value }
			onChange={ ( value ) => {
				setDescription( chapter, value );
			} }
		/>
	);
}