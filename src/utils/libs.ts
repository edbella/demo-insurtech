export const formatNumberToCurrency = ({
	number,
	currencyCode = "USD",
	precision = 0,
}: {
	number: string | number;
	currencyCode?: Intl.NumberFormatOptions["currency"];
	precision?: number;
}): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currencyCode,
		minimumFractionDigits: precision,
	});

	let value = Number(number);

	if (isNaN(value)) {
		value = 0;
	}

	const formattedValue = formatter.format(value);
	const outputValue = `${formattedValue.slice(1)} ${currencyCode}`;

	return outputValue;
};
