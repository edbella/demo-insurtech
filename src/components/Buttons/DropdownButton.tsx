import Dropdown from "react-dropdown";
import { ReactComponent as ArrowIcon } from "@/assets/svg/arrow-down.svg";
import "react-dropdown/style.css";
import "./styles/dropdown.scss";
import { DropdownButtonProps } from "./types";

const DropdownButton = (props: DropdownButtonProps) => {
	return (
		<Dropdown
			{...props}
			className="dropdown-button"
			menuClassName="menu-list"
			controlClassName="control"
			placeholderClassName="input"
			arrowOpen={<ArrowIcon />}
			arrowClosed={<ArrowIcon />}
		/>
	);
};

export default DropdownButton;
