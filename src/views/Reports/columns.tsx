import { format } from "date-fns";
import { Report } from "./components/types";

export const GATEWAY_COLUMNS = [
	{
		label: "Date",
		renderCell: (row: Report) => format(row?.created, "dd/mmmm/yyyy"),
	},
];
