import "./styles/header.scss";
import BLogo from "@/assets/svg/b-logo.svg";
import { ReactComponent as Elogo } from "@/assets/svg/e-logo.svg";

const Header = () => {
	return (
		<header className="header">
			<img src={BLogo} alt="Platform logo" className="logo" />

			<button className="toggler">
				<Elogo />
			</button>

			<article className="avatar">
				<div>JD</div>
				<p>John Doe</p>
			</article>
		</header>
	);
};

export default Header;
