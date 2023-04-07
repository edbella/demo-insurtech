import useToggle from "@/hooks/useToggle";
import { formatNumberToCurrency } from "@/utils/libs";

import clsx from "clsx";
import { useCollapse } from "react-collapsed";
import { Report } from "./types";
import Table from "@/components/Table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { PAYMENT_FULL_COLUMNS, PAYMENT_SUB_COLUMNS } from "./constants";

const PaymentSheet = ({
	payments,
	title,
	isDefaultOpen = false,
	isInComplete,
}: {
	title: string;
	isDefaultOpen?: boolean;
	payments: Report[];
	isInComplete: boolean;
}) => {
	const {
		getCollapseProps,
		getToggleProps,
		isExpanded: isOpen,
	} = useCollapse({
		defaultExpanded: isDefaultOpen,
	});

	const pagination = usePagination(
		{ nodes: payments },
		{
			state: {
				page: 0,
				size: 10,
			},
		}
	);

	const totalPayments = payments?.reduce((acc, payment) => {
		const { amount = 0 } = payment;
		acc += amount;
		return acc;
	}, 0);

	return (
		<article>
			<main
				role="button"
				className="bg-white px-6 py-4 rounded-lg flex flex-row justify-between gap-4"
				{...getToggleProps()}
			>
				<p className="font-bold">{title}</p>
				<p className="font-bold">{`TOTAL: ${formatNumberToCurrency({
					number: totalPayments,
				})}`}</p>
			</main>

			<aside {...getCollapseProps()}>
				<Table
					columns={isInComplete ? PAYMENT_SUB_COLUMNS : PAYMENT_FULL_COLUMNS}
					data={{ nodes: payments }}
					pagination={pagination as any}
				/>
				<div className="flex flex-row gap-2 justify-end py-2 text-xs items-center">
					<p>Page </p>
					{pagination.state.getPages(payments).map((_: any, index: number) => {
						const isSelected = pagination.state.page === index;

						return (
							<button
								key={index}
								type="button"
								className={clsx(
									"px-2 py-1 text-brand-blue bg-gray-100 rounded hover:bg-brand-mid-blue hover:text-white transition-all duration-200 ease-in-out",
									isSelected && "font-semibold !bg-brand-blue !text-brand-light-blue"
								)}
								onClick={() => pagination.fns.onSetPage(index)}
							>
								{index + 1}
							</button>
						);
					})}
				</div>
			</aside>
		</article>
	);
};

export default PaymentSheet;
