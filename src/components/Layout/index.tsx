import { ReactNode } from "react";
import "./styles/layout.scss";

import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="app-layout">
			<Header />
			<div className="body">
				<SideNav />
				<main>
					{children}
					<Footer />
				</main>
			</div>
		</div>
	);
};

export default Layout;
