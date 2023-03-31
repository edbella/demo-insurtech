import { SIDE_BAR_NAV } from "./constants";

const SideNav = () => {
	return (
		<aside className="side-nav">
			{SIDE_BAR_NAV.map(({ key, icon: Icon }) => {
				return (
					<button key={key} className="nav-button">
						<Icon />
					</button>
				);
			})}
		</aside>
	);
};

export default SideNav;
