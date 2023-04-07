import { TableNode } from "@table-library/react-table-library";
import { Column } from "@table-library/react-table-library/types/compact";
import { format } from "date-fns";
import { Report } from "./types";
import { formatNumberToCurrency } from "@/utils/libs";

export const PAYMENT_FULL_COLUMNS: Column<TableNode>[] = [
	{
		label: "Date",
		renderCell: (node) => {
			const { created = "" } = node as Report;

			return format(new Date(created), "MM/dd/yyyy");
		},
	},
	{
		label: "Gateway",
		renderCell: (node) => {
			const { gatewayName = "" } = node as Report;
			return gatewayName;
		},
	},
	{
		label: "Transaction ID",
		renderCell: (node) => {
			const { paymentId = "" } = node as Report;
			return paymentId;
		},
	},
	{
		label: "Amount",
		renderCell: (node) => {
			const { amount = 0 } = node as Report;

			return formatNumberToCurrency({ number: amount });
		},
	},
];

export const PAYMENT_SUB_COLUMNS: Column<TableNode>[] = [
	{
		label: "Date",
		renderCell: (node) => {
			const { created = "" } = node as Report;

			return format(new Date(created), "MM/dd/yyyy");
		},
	},
	{
		label: "Transaction ID",
		renderCell: (node) => {
			const { paymentId = 0 } = node as Report;
			return paymentId;
		},
	},
	{
		label: "Amount",
		renderCell: (node) => {
			const { amount = 0 } = node as Report;

			return formatNumberToCurrency({ number: amount });
		},
	},
];
