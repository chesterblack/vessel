export default function SocialIcon({ link, socialType, icon }) {
	return (
		<a href={link} target="_blank">
			<img src={icon} alt={socialType} className="social-icon" />
		</a>
	);
}
