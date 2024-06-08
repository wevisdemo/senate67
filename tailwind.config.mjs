import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sarabun: ["Sarabun", ...defaultTheme.fontFamily.sans],
			crushual: ["Crushual", ...defaultTheme.fontFamily.serif],
			trirong: ["Trirong", ...defaultTheme.fontFamily.serif],
		},
		fontSize: [],
		colors: [],
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				default: {
					primary: "#277CE2",
					secondary: "#FCEB71",
					accent: "#FF8827",
					neutral: "#101C3D",
					"base-100": "#FFFFFF",
					"base-200": "#F2F2F2",
					"base-300": "#D4D4D4",
					info: "#83D3FF",
					"accent-focus": "#FF5C00",
				},
			},
		],
	},
};
