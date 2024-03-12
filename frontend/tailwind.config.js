/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				pablo: {
					50: "#CECBC5",
					100: "#C5C1BA",
					200: "#B2ADA3",
					300: "#9F9A8D",
					400: "#8D8677",
					500: "#777164",
					600: "#59544A",
					700: "#3A3731",
					800: "#1C1A17",
					900: "#000000",
					950: "#000000"
				},
			}
		},
	},
	plugins: [],
}
