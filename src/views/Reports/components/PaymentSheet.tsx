import useToggle from "@/hooks/useToggle";
import { formatNumberToCurrency } from "@/utils/libs";

import { useCollapse } from "react-collapsed";
import { Report } from "./types";

const PaymentSheet = ({
	payments,
	title,
	isDefaultOpen = false,
}: {
	title: string;
	isDefaultOpen?: boolean;
	payments: Report[];
}) => {
	const {
		getCollapseProps,
		getToggleProps,
		isExpanded: isOpen,
	} = useCollapse({
		defaultExpanded: isDefaultOpen,
	});

	const totalPayments = payments?.reduce((acc, payment) => {
		const { amount = 0 } = payment;
		acc += amount;
		return acc;
	}, 0);

	return (
		<article>
			<main
				role="button"
				className="bg-white p-6 rounded-lg flex flex-row justify-between gap-4"
				{...getToggleProps()}
			>
				<p className="font-bold">{title}</p>
				<p className="font-bold">{`TOTAL: ${formatNumberToCurrency({
					number: totalPayments,
				})}`}</p>
			</main>

			<aside {...getCollapseProps()}>Hello</aside>
		</article>
	);
};

export default PaymentSheet;
