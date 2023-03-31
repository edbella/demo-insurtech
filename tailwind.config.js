/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					blue: "var(--base-color-dark-blue)",
					green: "var(--base-color-green)",
					"mid-blue": "var(--base-color-mid-blue)",
					"light-blue": "var(--base-color-light-blue)",
					yellow: "var(--base-color-yellow)",
					gray: "var(--base-color-gray)",
				},
			},
		},
	},
	plugins: [],
};
