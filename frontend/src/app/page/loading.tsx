import { Skeleton as PageAreaSkeleton } from "@/components/server/PageArea";
import { Skeleton as PageReaderNavSkeleton } from "@/components/server/PageReaderNav";


export default function Loading() {
	return (
		<main className="page-reader">
			<PageReaderNavSkeleton />
			<PageAreaSkeleton />
			<PageReaderNavSkeleton />
		</main>
	);
}