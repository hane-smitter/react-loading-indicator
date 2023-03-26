const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./base.webpack.config");

console.log("NOW bundling to ESM module...");

const outputDir = path.resolve(__dirname, "dist/mjs");

const config = merge(baseConfig, {
	output: {
		path: outputDir,
		// filename: "[name].[contenthash:5].js",
		filename: "[name].js",
		libraryTarget: "module"
	},
	module: {
		// config.module.rules[0].use[1].options.compilerOptions
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
							compilerOptions: { declarationDir: `${outputDir}` }
							// compilerOptions: this
						}
					}
				],
				exclude: /node_modules/
			}
		]
	},
	experiments: { outputModule: true }
	// mjstest: function () {
	// 	console.log("in MJS CONFIG: ", JSON.stringify(this.module.rules, null, 2));
	// 	console.log("OUTPUT PATH IN MJS CONFIG: ", outputDir);
	// }
});

// config.mjstest();
console.log(config.module.rules[1].use[1].options.compilerOptions);

module.exports = config;
