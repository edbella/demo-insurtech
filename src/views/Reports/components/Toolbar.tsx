import Button from "@/components/Buttons/Button";
import DropdownButton from "@/components/Buttons/DropdownButton";
import DatePicker from "@/components/Inputs/DatePicker";
import useApiRequest from "@/hooks/useApiRequest";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Gateway, Project, Report } from "./types";

const Toolbar = ({
	onReport,
	onParams,
}: {
	onReport: (reports: Report[]) => void;
	onParams: (params: Record<string, string>) => void;
}) => {
	const makeRequest = useApiRequest();
	const [projects, setProjects] = useState<Project[]>([]);
	const [gateways, setGateways] = useState<Gateway[]>([]);
	const [toolbarArguments, setToolbarArguments] = useState<
		Record<string, string>
	>({});
	const [hasError, setError] = useState<unknown>(null);
	const [isLoading, setLoading] = useState(false);

	// Fetch projects and gateways
	const handleFetch = async () => {
		setError(null);
		setLoading(true);
		try {
			const [projectsResponse, gatewaysResponse] = await Promise.all([
				makeRequest.get("/projects"),
				makeRequest.get("/gateways"),
			]);

			setProjects(projectsResponse?.data?.data as Project[]);
			setGateways(gatewaysResponse?.data?.data as Gateway[]);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	// Get Reports
	const getReports = async () => {
		setError(null);
		setLoading(true);
		try {
			const {
				data: { data: reports },
			} = await makeRequest.post(`/report`, toolbarArguments);

			// Send report parameters
			if (onParams) {
				onParams(toolbarArguments);
			}

			// Send report result
			if (onReport) {
				onReport(reports);
			}
		} catch (error) {
			setError(error);
		}
		setLoading(false);
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

	// Generate the Gateway list
	const GATEWAY_LIST = useMemo(() => {
		const list = gateways.map(({ gatewayId = "", name = "" }) => ({
			value: gatewayId,
			label: name,
		}));

		return [{ value: "", label: "All gateways" }, ...list];
	}, [gateways]);

	// Generate the project list
	const PROJECT_LIST = useMemo(() => {
		const list = projects.map(({ projectId = "", name = "" }) => ({
			value: projectId,
			label: name,
		}));

		return [{ value: "", label: "All projects" }, ...list];
	}, [projects]);

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
					maxDate: `2021-12-31`,
				}}
				onChange={([date]) => {
					handleChange("from", format(date, "yyyy-MM-dd"));
				}}
				value={toolbarArguments["from"]}
			/>
			<DatePicker
				placeholder="To Date"
				options={{
					minDate: `2021-01-01`,
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
