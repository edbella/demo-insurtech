import { useState, useCallback } from "react";

/** A simple hook to toggle between boolean states */
const useToggle = (): [boolean, () => void] => {
	const [value, setValue] = useState(false);

	// Function to handle the toggling
	const toggleValue = useCallback(() => setValue((prev: boolean) => !prev), []);

	return [value, toggleValue];
};

export default useToggle;
