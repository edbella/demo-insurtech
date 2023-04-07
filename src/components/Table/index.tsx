import { CompactTable } from "@table-library/react-table-library/compact";
import { CompactTableProps } from "@table-library/react-table-library/types/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
	DEFAULT_OPTIONS,
	getTheme,
} from "@table-library/react-table-library/material-ui";

import { tableCustomTheme } from "./tableCustomTheme";
import { TableNode } from "@table-library/react-table-library";

/** Render responsive table component */
const Table = (props: CompactTableProps<TableNode>) => {
	// Setup material theme
	const tableTheme = getTheme({
		...DEFAULT_OPTIONS,
		verticalSpacing: 10,
		highlightOnHover: true,
	});

	// Setup table theme
	const theme = useTheme([tableTheme, tableCustomTheme]);

	return <CompactTable theme={theme} {...props} />;
};

export default Table;
