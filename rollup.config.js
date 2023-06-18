import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: false
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: false
			}
		],
		plugins: [
			peerDepsExternal(), // Prevents Rollup from bundling the peer dependencies we've defined in package.json (react and react-dom)
			resolve(), // Efficiently bundles third party dependencies we've installed and use in node_modules
			commonjs(), //  Enables transpilation into CommonJS (CJS) format
			typescript({ tsconfig: "./tsconfig.json" }), // Transpiles our TypeScript code into JavaScript
			postcss({ plugins: [autoprefixer] }), // Transforms our Sass -> into CSS -> into JS tokens; for injection in style tags of HTML
			terser() // Minify the Rollup bundle
		]
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.(css|less|s[ac]ss|stories.[tj]s[x]?)$/] // Packages that should not be in our bundle
	}
];
