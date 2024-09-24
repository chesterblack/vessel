/**
 * Gets the most up-to-date character bio according to how far you've read
 *
 * @param {object} character The character we're getting the bio for
 * @param {array} chapters An array of objects containing an id attribute for every chapter
 * @param {string} currentlyReadChapter The id of the latest read chapter
 * @returns {mixed} An object with id and text, or false
 */
export function getLatestCharacterBio(
	character,
	chapters,
	currentlyReadChapter
) {
	let latestChapterDesc = false;
	let stop = false;

	chapters.forEach((chapter) => {
		let currentChapterDescription = character.fields.descriptions.find(
			(el) => el.id == chapter.id
		);
		if (!stop && currentChapterDescription) {
			latestChapterDesc = currentChapterDescription;
		}
		if (chapter.id == currentlyReadChapter) {
			stop = true;
		}
	});

	return latestChapterDesc;
}
