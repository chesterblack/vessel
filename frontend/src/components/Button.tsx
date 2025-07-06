import { MouseEventHandler, ReactNode } from "react";

import Link from "next/link";

interface Props {
	disabled: boolean
	children: ReactNode[]
	href?: string
	onClick?: MouseEventHandler
}

export default function Button( { href, onClick, disabled, children }: Props ) {
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