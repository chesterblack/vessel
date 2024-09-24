import { useEffect, useState } from 'react';

import Title from '../components/Title';
import ChapterList from '../components/ChapterList';
import CharacterList from '../components/CharacterList';

import { getCharacters, getChapters } from '../lib/contentful';

export default function CastPage() {
	const [characters, setCharacters] = useState(false);
	const [chapters, setChapters] = useState(false);
	const [currentlyReadChapter, setCurrentlyReadChapter] = useState(false);

	useEffect(() => {
		(async () => {
			let chapters = await getChapters();
			setChapters(chapters);
			setCurrentlyReadChapter(chapters[0].id);
	
			let characters = await getCharacters();
			setCharacters(characters);
		})()
	}, []);

	return (
		<>
			<Title>Meet the characters</Title>
			<label>
				<span>How far have you read?</span>
				{(() => {
					if (chapters) {
						return (
							<ChapterList
								chapters={chapters}
								currentlyReadChapter={currentlyReadChapter}
								setCurrentlyReadChapter={
									setCurrentlyReadChapter
								}
							/>
						);
					}
				})()}
			</label>
			{(() => {
				if (characters) {
					return (
						<CharacterList
							chapters={chapters}
							characters={characters}
							currentlyReadChapter={currentlyReadChapter}
						/>
					);
				}
			})()}
		</>
	);
}
