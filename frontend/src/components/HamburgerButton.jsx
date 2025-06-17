import '@/styles/hamburger.scss';

export default function HamburgerButton({ active, callback }) {
	return (
		<button
			className={ `hamburger ${ active ? 'active' : '' }` }
			onClick={ () => { callback( ! active ) } }
			aria-label='Menu'
		>
			<div></div>
			<div></div>
			<div></div>
		</button>
	);
}