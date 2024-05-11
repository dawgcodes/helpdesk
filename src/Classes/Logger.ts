import c from "ansi-colors";

export default class Logger {
	static getDate() {
		return `${c.gray(`[${new Date().toLocaleDateString()}]`)}`;
	}

	static startup(...message: any) {
		console.log(`${Logger.getDate()} ${c.bold.green("REEDROUX HELPER [STARTUP]")} ${" ".repeat(2)}`, ...message);
	}

	static log(...message: any) {
		console.log(`${Logger.getDate()} ${c.bold.white("REEDROUX HELPER [LOG]")}  ${" ".repeat(5)}`, ...message);
	}

	static info(...message: any) {
		console.log(`${Logger.getDate()} ${c.bold.blueBright("REEDROUX HELPER [INFO]")} ${" ".repeat(5)}`, ...message);
	}

	static error(...message: any) {
		console.log(`${Logger.getDate()} ${c.bold.red("REEDROUX HELPER [ERROR]")}${" ".repeat(5)}`, ...message);
	}
}
