import "!style-loader!css-loader!sass-loader!./scss-loader.scss";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};
