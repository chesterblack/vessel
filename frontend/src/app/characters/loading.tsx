import '@/styles/characters.scss'

export default function Loading() {
	return (
		<main className='characters loading'>
			<h1>Characters</h1>
			<p>
				Meet the characters that Percy has met along his journey!
			</p>
			<div className="how-far">
				<h2>How far have you read?</h2>
			</div>
		</main>
	)
}