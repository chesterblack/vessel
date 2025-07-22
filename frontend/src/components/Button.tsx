import { MouseEventHandler, ReactNode } from "react";

import Link from "next/link";

interface Props {
	disabled?: boolean
	children: ReactNode|ReactNode[]
	href?: string
	onClick?: MouseEventHandler
	classes?: string
}

export default function Button( {
	href,
	onClick,
	disabled = false,
	children,
	classes = ''
}: Props ) {
	if ( disabled ) {
		href = null;
		onClick = null;
	}

	if ( href ) {
		return (
			<Link
				className={ `button ${ classes }` }
				onClick={ onClick }
				href={ href }
			>
				{ children }
			</Link>
		);
	};

	return (
		<button
			className={ `button ${ classes }` }
			onClick={ onClick }
			disabled={ disabled }
		>
			{ children }
		</button>
	);
}