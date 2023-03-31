import { formatNumberToCurrency } from "@/utils/libs";
import { useMemo } from "react";
import { Gateway, Project, Report } from "./types";
import PaymentSheet from "./PaymentSheet";

const ResultsSheet = ({
	reports,
	params,
	breadcrumb,
}: {
	reports: Report[];
	params: Record<string, string>;
	breadcrumb: string;
}) => {
	const { projectId = "ALL", gatewayId = "ALL" } = params;
	const projects = JSON.parse(
		localStorage.getItem("projects") || ""
	) as Project[];
	const gateways = JSON.parse(
		localStorage.getItem("gateways") || ""
	) as Gateway[];

	// Calculate the total payments
	const { totalPayments, paymentsData } = useMemo(() => {
		let totalPayments = 0;

		// Remap the data to include the project and gateway name
		const paymentsData = reports?.reduce(
			(acc: Record<string, Report[]>, report) => {
				const { amount = 0, gatewayId = "", projectId = "" } = report;
				totalPayments += amount;

				const projectName = projects?.find(({ projectId: id }) => id === projectId)
					?.name as string;

				const gatewayName = gateways?.find(({ gatewayId: id }) => id === gatewayId)
					?.name as string;

				if (!acc[projectName]) {
					acc[projectName] = [];
				}

				acc[projectName].push({
					...report,
					projectName: projectName as string,
					gatewayName: gatewayName as string,
				});

				return acc;
			},
			{}
		);

		return { totalPayments, paymentsData };
	}, [reports]);

	return (
		<>
			<div className="bg-brand-light-blue p-4 rounded-lg">
				<p className="font-bold mb-10">{breadcrumb}</p>

				<div className="flex flex-col gap-4">
					{Object.keys(paymentsData).map((paymentGroup) => {
						const payments = paymentsData[paymentGroup] as Report[];

						return (
							<PaymentSheet
								key={paymentGroup}
								title={paymentGroup}
								payments={payments}
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
		</>
	);
};

export default ResultsSheet;
