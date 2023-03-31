import React, { ChangeEventHandler, LegacyRef, useRef, useState } from "react";

import "../Buttons/styles/button.scss";
import "flatpickr/dist/themes/airbnb.css";

import Flatpickr, { DateTimePickerProps } from "react-flatpickr";
import { ReactComponent as CalendarIcon } from "@/assets/svg/calendar.svg";

export default function DatePicker({
	placeholder = "Date",
	...props
}: DateTimePickerProps & { placeholder: string }) {
	return (
		<>
			<Flatpickr
				{...props}
				render={({ defaultValue, value }, ref) => {
					return (
						<button
							ref={ref as any}
							id={placeholder}
							name={placeholder}
							className="brand-button date-picker"
						>
							<span>{(value || defaultValue || placeholder)?.toString()}</span>
							<CalendarIcon />
						</button>
					);
				}}
			/>
		</>
	);
}
