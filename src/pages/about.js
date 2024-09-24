import Author from '../components/Author';
import Title from '../components/Title';

export default function AboutPage() {
	return (
		<>
			<Title>About Vessel</Title>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				Repellat accusamus dicta a culpa possimus quibusdam nisi
				reiciendis et! Quisquam mollitia consequatur doloribus similique
				dolores? Nam rerum eaque nulla labore deserunt!
			</p>
			<section>
				<h2>Meet the authors</h2>
				<Author
					name="Kip"
					portrait="https://placekitten.com/150/200"
					description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ad assumenda, suscipit, ea asperiores voluptatum quos vel dolores quas similique enim non incidunt totam, voluptates ut cupiditate. Voluptatum, esse quo?"
				/>
				<Author
					name="Chester"
					portrait="https://placekitten.com/150/200"
					description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ad assumenda, suscipit, ea asperiores voluptatum quos vel dolores quas similique enim non incidunt totam, voluptates ut cupiditate. Voluptatum, esse quo?"
				/>
			</section>
		</>
	);
}
