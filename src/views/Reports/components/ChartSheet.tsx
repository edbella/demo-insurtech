import useToggle from "@/hooks/useToggle";
import { formatNumberToCurrency } from "@/utils/libs";

import { Chart } from "react-google-charts";
import { Report } from "./types";

const colorScheme = ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"];
const options = {
	colors: colorScheme,
	pieHole: 0.4,
	is3D: false,
	legend: "none",
	chartArea: {
		top: 30,
		left: 20,
		right: 20,
		height: "85%",
		bottom: 40,
	},
};

const ChartSheet = ({
	payments,
	title = "",
}: {
	payments: Record<string, Report[]>;
	title: string;
}) => {
	const paymentGroups = Object.keys(payments).sort((a, b) => a.localeCompare(b));
	let totalPayments = 0;
	const chartData: (string | number)[][] = [["Project", "Amount"]];

	paymentGroups.forEach((paymentGroup) => {
		const groupPayments = payments[paymentGroup];

		const total = groupPayments?.reduce((acc, payment) => {
			const { amount = 0 } = payment;
			acc += amount;
			return acc;
		}, 0);

		chartData.push([paymentGroup, total]);
		totalPayments += total;
	});

	return (
		<article className="bg-white flex flex-col gap-5">
			<div className="bg-brand-light-blue py-3 px-6 rounded-lg flex flex-row gap-8 flex-wrap">
				{paymentGroups.map((paymentGroup, index) => (
					<p
						key={paymentGroup}
						className="text-sm inline-flex flex-row gap-2 items-center"
					>
						<span
							style={{
								display: "inline-block",
								borderRadius: 5,
								width: 15,
								height: 15,
								backgroundColor: colorScheme[index],
							}}
						/>
						{paymentGroup}
					</p>
				))}
			</div>

			<Chart
				chartType="PieChart"
				width="100%"
				height="400px"
				data={chartData}
				options={options}
			/>

			<div className="bg-brand-light-blue py-3 px-6 rounded-lg">
				<p className="font-bold">{`${title.toUpperCase()} TOTAL | ${formatNumberToCurrency(
					{
						number: totalPayments,
					}
				)}`}</p>
			</div>
		</article>
	);
};

export default ChartSheet;
