import '@/styles/hamburger.scss';

type Props = {
	active: boolean
	callback: ( a: boolean ) => void
}

export default function HamburgerButton( { active, callback }: Props ) {
	return (
		<button
			className={ `hamburger ${ active ? 'active' : '' }` }
			onClick={ () => callback( ! active ) }
			aria-label='Menu'
		>
			<div></div>
			<div></div>
			<div></div>
		</button>
	);
}