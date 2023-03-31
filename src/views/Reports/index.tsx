import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import EmptyReports from "./components/EmptyReports";
import ResultsSheet from "./components/ResultsSheet";
import Toolbar from "./components/Toolbar";
import { Report } from "./components/types";
import "./style.scss";

const Reports = () => {
	const makeRequest = useApiRequest();
	const [reports, setReports] = useState<Report[]>([]);
	const [reportParams, setReportParams] = useState<Record<string, string>>({});
	const [breadcrumb, setBreadcrumb] = useState("");

	useEffect(() => {
		makeRequest.get("/gateways");
	}, []);

	return (
		<div className="reports-view">
			<article className="header">
				<div className="flex flex-col">
					<h1 className="font-bold text-2xl text-brand-blue">Reports</h1>
					<p className="font-bold text-brand-gray">
						Easily generate a report of your transactions
					</p>
				</div>
				<Toolbar
					onReport={setReports}
					onParams={setReportParams}
					onBreadcrumb={setBreadcrumb}
				/>
			</article>

			{!reports?.length ? (
				<EmptyReports />
			) : (
				<ResultsSheet
					reports={reports}
					params={reportParams}
					breadcrumb={breadcrumb}
				/>
			)}
		</div>
	);
};

export default Reports;
