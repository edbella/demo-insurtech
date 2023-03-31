import { ReactNode } from "react";

export type Option = {
	label: ReactNode;
	value: string;
	className?: string;
	data?: {
		[dataAttribute: string]: string | number;
	};
};

export type Group = {
	type: "group";
	name: string;
	items: Option[];
};

export type DropdownButtonProps = {
	options: (Group | Option | string)[];
	baseClassName?: string;
	className?: string;
	controlClassName?: string;
	placeholderClassName?: string;
	menuClassName?: string;
	arrowClassName?: string;
	disabled?: boolean;
	arrowClosed?: ReactNode;
	arrowOpen?: ReactNode;
	onChange?: (arg: Option) => void;
	onFocus?: (arg: boolean) => void;
	value?: Option | string;
	placeholder: string;
};
