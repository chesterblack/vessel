export default function Author({ name, description, portrait }) {
	return (
		<div className="character-bio">
			<img src={portrait} />
			<div>
				<h3>{name}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}
