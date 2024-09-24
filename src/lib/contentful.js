import { createClient } from 'contentful';

const client = createClient({
	space: process.env.NEXT_PUBLIC_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENT_DELIVERY_KEY,
});

export async function getCharacters() {
	return await client
		.getEntries({ content_type: 'character' })
		.then((characters) => {
			return characters.items;
		});
}

export async function getChapters() {
	let allChapters = [];

	await client.getEntries({ content_type: 'chapter' }).then((chapters) => {
		chapters.items.forEach((chapter) => {
			allChapters.push({
				chapterName: chapter.fields.chapterName,
				id: chapter.sys.id,
				pages: chapter.fields.pages,
			});
		});
	});

	return allChapters;
}

export async function getPages() {
	return await client
		.getEntries({ content_type: 'comicPage' })
		.then((pages) => {
			return pages.items;
		});
}

export async function getLatestPage() {
	const allPages = await getPages();
	const sortedPages = allPages.sort(
		(a, b) => a.fields.position - b.fields.position
	);
	return sortedPages[sortedPages.length - 1];
}
