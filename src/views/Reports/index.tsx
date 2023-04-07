import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import EmptyReports from "./components/EmptyReports";
import ResultsSheet from "./components/ResultsSheet";
import Toolbar from "./components/Toolbar";
import { Report } from "./components/types";
import "./style.scss";

const Reports = () => {
	const [reports, setReports] = useState<Report[]>([]);
	const [reportParams, setReportParams] = useState<Record<string, string>>({});
	const [breadcrumb, setBreadcrumb] = useState("");
	const [isLoading, setLoading] = useState(false);

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
					onLoading={setLoading}
				/>
			</article>

			{isLoading ? (
				<div className="min-h-[450px] text-center max-w-[470px] mx-auto h-full flex flex-col justify-center items-center">
					<p>Fetching reports...</p>
				</div>
			) : (
				<>
					{!reports?.length ? (
						<EmptyReports />
					) : (
						<ResultsSheet
							reports={reports}
							params={reportParams}
							breadcrumb={breadcrumb}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Reports;
