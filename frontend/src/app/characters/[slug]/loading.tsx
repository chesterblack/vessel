import '@/styles/characters.scss'

export default function Loading() {
	return (
		<main className='character'>
			<div className="how-far">
				<h2>How far have you read?</h2>

				<div className="chapter-selector">
					<select defaultValue='Loading...'>
						<option disabled>Loading...</option>
					</select>
				</div>
			</div>
		</main>
	)
}