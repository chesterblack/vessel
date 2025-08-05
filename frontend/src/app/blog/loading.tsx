import { blogDescription } from "./page";

export default async function Loading() {
	return (
		<>
			<main className="blog-archive">
				<h1>Blog</h1>
				<p>{ blogDescription }</p>
			</main>
		</>
	)
}