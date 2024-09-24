export default function FrontPage() {
	return (
		<>
			<div id="mainpage">
				{/* TODO: Stick a placeholder in here once you know how big the images are going to be */}
			</div>
			<nav>
				<button className="first">First</button>
				<button className="prev">&gt;</button>
				<select className="pageselector">
					<option>-</option>
				</select>
				<button className="next">&lt;</button>
				<button className="last">Latest</button>
			</nav>
		</>
	);
}
