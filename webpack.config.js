const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const autoprefixer = require("autoprefixer");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const glob = require("glob").sync;

console.log("process.env.NODE_ENV:: ", process.env.NODE_ENV);

// Object.fromEntries(
// 		glob("src/indicators/**/*.{tsx, jsx}", { ignore: '*.stories.{tsx, jsx}' }).map(file => [
// 			path.relative(
// 				"src",
// 				file.slice(0, file.length - path.extname(file).length)
// 			),
// 			// This expands the relative paths to absolute paths, so e.g.
// 			// src/nested/foo becomes /project/src/nested/foo.js
// 			fileURLToPath(new URL(file, import.meta.url))
// 		])

/* 

library: ["MyLibrary", "[name]"],
libraryTarget: "umd"

*/

module.exports = {
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
	// entry: ["./src/index.ts, ./src/indicators/**/* "],
	mode: process.env.NODE_ENV,
	output: {
		path: path.resolve(__dirname, "dist"),
		// filename: "[name].[contenthash:5].js",
		filename: "[name].js",
		libraryTarget: "module"
	},
	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				use: [
					{
						loader: "babel-loader"
					}
					// {
					// 	loader: "ts-loader",
					// 	options: {
					// 		transpileOnly: true
					// 	}
					// }
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
				]
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
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
	externals: "react",
	experiments: { outputModule: true }
};
