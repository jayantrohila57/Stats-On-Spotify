/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		minWidth: {
			0: "0rem",
			10: "10rem",
		},
		extend: {},
	},
	plugins: [
		// ...
		require("tailwind-scrollbar"),
		require("@tailwindcss/line-clamp"),
	],
	variants: {
		// ...
		scrollbar: ["dark"],
	},
};
