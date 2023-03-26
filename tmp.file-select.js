const glob = require("glob").sync;
const path = require("path");

const files = Object.fromEntries(
	glob("src/indicators/**/*.{tsx, jsx}", {
		ignore: "src/indicators/**/*.stories.{tsx, jsx}"
	}).map(file => {
		// console.log(file);
		// console.log(file.lastIndexOf("/"));
		// console.log(file.slice(0, file.lastIndexOf("/")));
		let arr = [
			// path.relative("src", file.slice(0, file.lastIndexOf("/"))),
			path.relative(
				"src",
				file.slice(0, file.length - path.extname(file).length)
			),
			// This expands the relative paths to absolute paths, so e.g.
			// src/nested/foo becomes /project/src/nested/foo.js
			path.resolve(__dirname, file)
		];
		return arr;
	})
);

console.log(files);
