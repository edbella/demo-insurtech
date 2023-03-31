import EmptyReportIcon from "@/assets/svg/no-reports.svg";

const EmptyReports = () => {
	return (
		<div className="min-h-[550px] text-center max-w-[470px] mx-auto h-full flex flex-col justify-center items-center">
			<h3 className="text-2xl font-bold">No reports</h3>
			<p className="text-brand-gray font-bold">
				Currently you have no data for the reports to be generated. Once you start
				generating traffic through the Balance application the reports will be
				shown.
			</p>

			<img src={EmptyReportIcon} className="mt-12" />
		</div>
	);
};

export default EmptyReports;
