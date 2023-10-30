const { exec } = require("child_process");
const packageJson = require("../package.json");
const chalk = require("chalk");

// const command = "[ \"$(npm view .@${npm_package_version})\" == \"\" ] && exit 0";
const command = `npm view ${packageJson.name}@${packageJson.version}`;

exec(command, (error, stdout, stderr) => {
	// console.log(process.cwd());
	if (error) {
		// console.log(`Command error: ${error.message}`);
		console.log(chalk.bgRed("Oops error:") + " " + error.message);
		process.exit(1);
	}
	if (stderr) {
		console.log(chalk.bgRed("stderr:") + " " + stderr);
		process.exit(2);
		// return;
	}
	// console.log(`stdout: ${stdout}`);
	if (stdout == "") {
		console.log(chalk.greenBright("New package Version!"));
		process.exit(0);
	} else {
		console.log(chalk.red("This package Version already exists!"));
		// console.log(`stdout: ${stdout}`);
		process.exit(3);
	}
});
