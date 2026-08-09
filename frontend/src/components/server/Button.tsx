import { MouseEventHandler, ReactNode } from "react";

import Link from "next/link";

type Props = {
	href?: string
	onClick?: MouseEventHandler
	disabled?: boolean
	children: ReactNode|ReactNode[]
	classes?: string
}

/**
 * Include an href to turn it into a styled link, or omit the href to have a button with an onClick function
 */
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