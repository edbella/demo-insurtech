import { ReactComponent as DashboardIcon } from "@/assets/svg/dashboard.svg";
import { ReactComponent as SquaresIcon } from "@/assets/svg/4-square.svg";
import { ReactComponent as WalletIcon } from "@/assets/svg/wallet.svg";
import { ReactComponent as ReportIcon } from "@/assets/svg/reports.svg";
import { ReactComponent as SwitchIcon } from "@/assets/svg/switch.svg";

export const SIDE_BAR_NAV = [
	{
		key: "dashboard",
		icon: DashboardIcon,
	},
	{
		key: "menu",
		icon: SquaresIcon,
	},
	{
		key: "wallet",
		icon: WalletIcon,
	},
	{
		key: "reports",
		icon: ReportIcon,
	},
	{
		key: "logout",
		icon: SwitchIcon,
	},
];
