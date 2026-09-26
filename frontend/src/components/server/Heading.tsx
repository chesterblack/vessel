import { Children, HeadingLevel } from "@/types/types";
import { ElementType, HTMLProps } from "react";

type Props = {
	level?: HeadingLevel
	children: Children
} & HTMLProps<HTMLHeadingElement>;

/** A heading tag of the specified level */
export default function Heading( props: Props ) {
	const { level, children } = props;
	const HeadingTag = 'h' + level as ElementType;

	return (
		<HeadingTag { ...props }>
			{ children }
		</HeadingTag>
	);
}