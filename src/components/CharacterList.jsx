import CharacterBio from './CharacterBio';
import { getLatestCharacterBio } from '../lib/main';

export default function CharacterList({
	chapters,
	characters,
	currentlyReadChapter,
}) {
	let inner = [];
	characters.forEach((character) => {
		let description = getLatestCharacterBio(
			character,
			chapters,
			currentlyReadChapter
		);

		let characterTrimmed = {
			characterName: character.fields.characterName,
			description: description,
			image: character.fields.characterPortrait.fields,
		};

		inner.push(<CharacterBio character={characterTrimmed} />);
	});

	return <section className="character-container">{inner}</section>;
}
