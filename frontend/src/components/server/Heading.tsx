import { Children, HeadingLevel } from "@/types/types";
import { ElementType } from "react";

interface Props {
	level?: HeadingLevel
	children: Children
};

/** A heading tag of the specified level */
export default function Heading( { level = 1, children }: Props ) {
	const HeadingTag = 'h' + level as ElementType;

	return (
		<HeadingTag>
			{ children }
		</HeadingTag>
	);
}