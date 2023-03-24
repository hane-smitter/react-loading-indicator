const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./base.webpack.config");

console.log("NOW bundling to commonjs...");

module.exports = merge(baseConfig, {
	output: {
		path: path.resolve(__dirname, "dist/cjs"),
		// filename: "[name].[contenthash:5].js",
		filename: "[name].js",
		libraryTarget: "commonjs"
	}
});
