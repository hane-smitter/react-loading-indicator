const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./base.webpack.config");

console.log("NOW bundling to commonjs...");

const outputDir = path.resolve(__dirname, "dist/cjs");

module.exports = merge(baseConfig, {
	output: {
		path: outputDir,
		// filename: "[name].[contenthash:5].js",
		filename: "[name].js",
		libraryTarget: "commonjs"
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
						loader: "ts-loader",
						options: {
							// transpileOnly: true,
							compilerOptions: { declarationDir: `${outputDir}/types` }
							// compilerOptions: this
						}
					}
				],
				exclude: /node_modules/
			}
		]
	}
});
