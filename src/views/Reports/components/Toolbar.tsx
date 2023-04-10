import Button from "@/components/Buttons/Button";
import DropdownButton from "@/components/Buttons/DropdownButton";
import DatePicker from "@/components/Inputs/DatePicker";
import useApiRequest from "@/hooks/useApiRequest";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import _isEmpty from "lodash.isempty";
import { Gateway, Project, Report } from "./types";

const Toolbar = ({
	onReport,
	onParams,
	onBreadcrumb,
	onLoading,
}: {
	onReport: (reports: Report[]) => void;
	onParams: (params: Record<string, string>) => void;
	onBreadcrumb: (breadcrumb: string) => void;
	onLoading: (loading: boolean) => void;
}) => {
	const makeRequest = useApiRequest();
	const [projects, setProjects] = useState<Project[]>([]);
	const [gateways, setGateways] = useState<Gateway[]>([]);
	const [toolbarArguments, setToolbarArguments] = useState<
		Record<string, string>
	>({
		from: "",
		to: "",
		gatewayId: "ALL",
		projectId: "ALL",
	});
	const [_, setError] = useState<unknown>(null);
	const [isLoading, setLoading] = useState(false);

	// Generate the Gateway list
	const GATEWAY_LIST = useMemo(() => {
		const list = gateways.map(({ gatewayId = "", name = "" }) => ({
			value: gatewayId,
			label: name,
		}));

		return [{ value: "ALL", label: "All gateways" }, ...list];
	}, [gateways]);

	// Generate the project list
	const PROJECT_LIST = useMemo(() => {
		const list = projects.map(({ projectId = "", name = "" }) => ({
			value: projectId,
			label: name,
		}));

		return [{ value: "ALL", label: "All projects" }, ...list];
	}, [projects]);

	// Fetch projects and gateways
	const handleFetch = async () => {
		setError(null);
		setLoading(true);

		try {
			const [
				{
					data: { data: projectsResponse },
				},
				{
					data: { data: gatewaysResponse },
				},
			] = await Promise.all([
				makeRequest.get("/projects"),
				makeRequest.get("/gateways"),
			]);

			setProjects(projectsResponse as Project[]);
			setGateways(gatewaysResponse as Gateway[]);

			// Set locally
			localStorage.setItem("projects", JSON.stringify(projectsResponse));
			localStorage.setItem("gateways", JSON.stringify(gatewaysResponse));
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	// Get Reports
	const getReports = async () => {
		setError(null);
		setLoading(true);
		onLoading(true);
		try {
			if (!_isEmpty(toolbarArguments)) {
				const payload: Record<string, string> = {};

				// Want to strip out instances of 'ALL' value
				Object.entries(toolbarArguments).forEach(([key, value]) => {
					if (value !== "ALL") {
						payload[key] = value;
					}
				});

				const {
					data: { data: reports },
				} = await makeRequest.post(`/report`, payload);

				const projectName = PROJECT_LIST?.find(
					({ value }) => value === toolbarArguments?.projectId
				)?.label;
				const gatewayName = GATEWAY_LIST?.find(
					({ value }) => value === toolbarArguments?.gatewayId
				)?.label;

				const breadcrumb = `${projectName || "All projects"} | ${
					gatewayName || "All gateways"
				}`;

				// Send report parameters
				onParams(toolbarArguments);

				// Send report result
				onReport(
					reports.map((report: Report) => ({ ...report, id: report?.paymentId }))
				);

				// set breadcrumb
				onBreadcrumb(breadcrumb);
			}
		} catch (error) {
			setError(error);
		}
		setLoading(false);
		onLoading(false);
	};

	// Fetch on mount
	useEffect(() => {
		handleFetch();
	}, []);

	// Handle change
	const handleChange = (name: string, value: string) => {
		setToolbarArguments((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Date limits
	const toDateLimit = toolbarArguments["from"];
	const fromDateLimit = toolbarArguments["to"];

	return (
		<div className="toolbar">
			<DropdownButton
				options={PROJECT_LIST}
				placeholder="Select Project"
				onChange={(selectedOption) => {
					handleChange("projectId", selectedOption?.value);
				}}
				value={toolbarArguments["projectId"] ?? ""}
			/>
			<DropdownButton
				options={GATEWAY_LIST}
				placeholder="Select Gateway"
				onChange={(selectedOption) => {
					handleChange("gatewayId", selectedOption?.value);
				}}
				value={toolbarArguments["gatewayId"] ?? ""}
			/>
			<DatePicker
				placeholder="From Date"
				options={{
					minDate: `2021-01-01`,
					maxDate: fromDateLimit ?? `2021-12-31`,
				}}
				onChange={([date]) => {
					handleChange("from", format(date, "yyyy-MM-dd"));
				}}
				value={toolbarArguments["from"]}
			/>
			<DatePicker
				placeholder="To Date"
				options={{
					minDate: toDateLimit ?? `2021-01-01`,
					maxDate: `2021-12-31`,
				}}
				onChange={([date]) => {
					handleChange("to", format(date, "yyyy-MM-dd"));
				}}
				value={toolbarArguments["to"]}
			/>
			<Button onClick={getReports} disabled={isLoading}>
				Generate report
			</Button>
		</div>
	);
};

export default Toolbar;
