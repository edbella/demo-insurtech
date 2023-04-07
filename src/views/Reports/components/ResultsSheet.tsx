import { formatNumberToCurrency } from "@/utils/libs";
import { useMemo } from "react";
import { Gateway, Project, Report } from "./types";
import PaymentSheet from "./PaymentSheet";
import ChartSheet from "./ChartSheet";

const ResultsSheet = ({
	reports,
	breadcrumb,
}: {
	reports: Report[];
	params: Record<string, string>;
	breadcrumb: string;
}) => {
	const projects = JSON.parse(
		localStorage.getItem("projects") || ""
	) as Project[];
	const gateways = JSON.parse(
		localStorage.getItem("gateways") || ""
	) as Gateway[];

	const gateway = breadcrumb.split(" | ")[1];
	const project = breadcrumb.split(" | ")[0];
	const hasGateway = !!gateways?.find(({ name }) => name === gateway)?.name;
	const hasProject = !!projects?.find(({ name }) => name === project)?.name;
	const isGatewayTitle = hasProject && !hasGateway;
	const dataKey = isGatewayTitle ? "gatewayName" : "projectName";

	// Calculate the total payments
	const { totalPayments, paymentsData, gatewayData } = useMemo(() => {
		let totalPayments = 0;

		// Remap the data to include the project and gateway name
		const paymentsData = reports?.reduce(
			(acc: Record<string, Report[]>, report) => {
				const { amount = 0, gatewayId = "", projectId = "" } = report;
				totalPayments += amount;

				const projectName = projects?.find(({ projectId: id }) => id === projectId)
					?.name as string;

				const { name: gatewayName = "", type = "" } =
					gateways?.find(({ gatewayId: id }) => id === gatewayId) ?? {};

				const props = { gatewayName, projectName };

				if (!acc[props[dataKey]]) {
					acc[props[dataKey]] = [];
				}

				acc[props[dataKey]].push({
					...report,
					projectName: projectName as string,
					gatewayName: gatewayName as string,
					type,
				});

				return acc;
			},
			{}
		);

		// Remap the data to include the project and gateway name
		const gatewayData = reports?.reduce(
			(acc: Record<string, Report[]>, report) => {
				const { amount = 0, gatewayId = "", projectId = "" } = report;
				totalPayments += amount;

				const projectName = projects?.find(({ projectId: id }) => id === projectId)
					?.name as string;

				const { name: gatewayName = "", type = "" } =
					gateways?.find(({ gatewayId: id }) => id === gatewayId) ?? {};

				const props = { gatewayName, projectName };

				if (!acc[type]) {
					acc[type] = [];
				}

				acc[type].push({
					...report,
					projectName: projectName as string,
					gatewayName: gatewayName as string,
					type,
				});

				return acc;
			},
			{}
		);

		return { totalPayments, paymentsData, gatewayData };
	}, [reports]);

	const canShowChart =
		(hasGateway && !hasProject) || (hasProject && !hasGateway);

	return (
		<div className="flex flex-row gap-5">
			<div className="flex-1">
				<div className="bg-brand-light-blue p-6 rounded-lg">
					<p className="font-bold mb-6">{breadcrumb}</p>

					<div className="flex flex-col gap-4">
						{Object.keys(paymentsData)
							.sort((a, b) => a.localeCompare(b))
							.map((paymentGroup, index) => {
								const payments = paymentsData[paymentGroup] as Report[];

								return (
									<PaymentSheet
										key={paymentGroup}
										title={paymentGroup}
										payments={payments}
										isDefaultOpen={index === 0}
										isInComplete={hasGateway || isGatewayTitle}
									/>
								);
							})}
					</div>
				</div>

				<div className="bg-brand-light-blue p-4 rounded-lg">
					<p className="font-bold">{`TOTAL: ${formatNumberToCurrency({
						number: totalPayments,
					})}`}</p>
				</div>
			</div>

			{canShowChart && (
				<div className="flex-1 max-w-[40%]">
					<ChartSheet
						payments={isGatewayTitle ? gatewayData : paymentsData}
						title={isGatewayTitle ? "Gateway" : "Project"}
					/>
				</div>
			)}
		</div>
	);
};

export default ResultsSheet;
