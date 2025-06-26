import '@/styles/page-reader.scss';
import PlaceholderPage from "@/components/PlaceholderPage";

export default function Loading() {
	return (
		<main className='page-reader loading'>
			<nav className="page-reader-nav"></nav>
			<PlaceholderPage />
			<nav className="page-reader-nav"></nav>
		</main>
	)
}