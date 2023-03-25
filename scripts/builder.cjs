#!/usr/bin/env node

const { spawn } = require("child_process");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
	.usage("Usage: $0 -t [str] -m [str]")
	.alias("t", "target")
	.demandOption(["t"])
	.nargs("t", 1)
	.alias("m", "mode")
	.default("m", "development")
	.nargs("m", 1)
	.describe("target", "target library format(commonjs or esm module)")
	.describe("mode", "Environment mode(production or development)").argv;

console.log({ argv });

const ES_MODULE = ["esm", "esmodule", "module", "mjs"];
const CJS_MODULE = ["cjs", "commonjs"];

const cliOpts = [];

const target = String(argv?.target).toLowerCase();
const mode = String(argv?.mode).toLowerCase();

const cmd = "webpack";

if (target) {
	ES_MODULE.includes(target)
		? cliOpts.push("--config mjs.webpack.config.js")
		: CJS_MODULE.includes(target)
		? cliOpts.push("--config cjs.webpack.config.js")
		: shutProcess("uknown target lib format provided", 1);
}

if (mode) {
	mode === "production"
		? cliOpts.push("--mode production")
		: mode === "development"
		? cliOpts.push("--mode development")
		: shutProcess("uknown environment mode", 1);
}

console.log(`Generated cmd: ${cmd} ${cliOpts.join(" ")}`);
console.log("Running on node version -- ", process.version);

runCommand(cmd, cliOpts, function (exit_code, output) {
	console.log("progress: Finished with exit code: " + exit_code);
	// console.log('Full output of script: ',output);
});

/* --FUNCTIONS DEFNs-- */

function shutProcess(msg, code = 1) {
	msg && console.log(msg);
	process.exit(code);
}

// This function will output the lines from the script
// AS it runs, AND will return the full combined output
// as well as exit code when it's done (using the callback).
function runCommand(command, args, callback) {
	console.log("Starting...");
	const child = spawn(command, args, { shell: true });

	let scriptOutput = "";

	child.stdout.setEncoding("utf8");
	child.stdout.on("data", function (data) {
		console.log("progress: " + data);

		data = data.toString();
		scriptOutput += data;
	});

	child.stderr.setEncoding("utf8");
	child.stderr.on("data", function (data) {
		console.log("stderr: " + data);

		data = data.toString();
		scriptOutput += data;
	});

	child.on("close", function (code) {
		callback(code, scriptOutput);
	});
}
