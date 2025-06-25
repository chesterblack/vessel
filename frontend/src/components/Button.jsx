import Link from "next/link";

export default function Button( { href, onClick, disabled, children } ) {
	if ( disabled ) {
		href = null;
		onClick = null;
	}

	if ( href ) {
		return (
			<Link
				className='button'
				onClick={ onClick }
				href={ href }
			>
				{ children }
			</Link>
		);
	};

	return (
		<button
			className='button'
			onClick={ onClick }
			disabled={ disabled }
		>
			{ children }
		</button>
	);
}