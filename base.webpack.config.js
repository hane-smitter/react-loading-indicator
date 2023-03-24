const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const autoprefixer = require("autoprefixer");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const glob = require("glob").sync;

module.exports = {
	name: "base",
	mode: "development",
	context: __dirname,
	entry: {
		index: path.resolve(__dirname, "src/index.ts"),
		...Object.fromEntries(
			glob("src/indicators/**/*.{tsx, jsx}", {
				ignore: "src/indicators/**/*.stories.{tsx, jsx}"
			}).map(file => [
				path.relative("src", file.slice(0, file.lastIndexOf("/"))),
				// This expands the relative paths to absolute paths, so e.g.
				// src/nested/foo becomes /project/src/nested/foo.js
				path.resolve(__dirname, file)
			])
		)
	},
	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin()]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", "d.ts"]
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "ts-loader"
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: { plugins: [autoprefixer] }
						}
					},
					"sass-loader"
				],
				exclude: /node_modules/
			}

			/* {
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			} */
		]
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
	externals: "react"
};
