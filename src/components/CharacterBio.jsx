export default function CharacterBio({ character }) {
	const { characterName, description, image } = character;

	let inner = <></>;

	if (description) {
		inner = (
			<div>
				<img src={image.file.url} alt={image.title} />
				<div>
					<h3>{characterName}</h3>
					<p>{description.text}</p>
				</div>
			</div>
		);
	}

	return inner;
}
