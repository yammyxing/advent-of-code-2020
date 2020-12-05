/**
 * @description Day 1: Report Repair
 */

const fs = require("fs");

/**
 * @description createLineReader
 * @param {String} filePath
 */
function createLineReader(filePath = "./input.md") {
	return require("readline").createInterface({
		input: fs.createReadStream(filePath),
	})
}

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = []
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			list.push(Number(line))
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

/**
 * @description find2020WithTwo
 * @param {Array} list
 * @param {Number} target
 */
function find2020WithTwo(list, target = 2020) {
	for (let i = 0; i < list.length; i++) {
		for (let j = 1; j < list.length; j++) {
			const frontOne = list[i];
			const latterOne = list[j];
			if (frontOne + latterOne === target) {
				console.log("answer with 2 is:", frontOne * latterOne, "input is:", frontOne, latterOne)
				return
			}
		}
	}
}

/**
 * @description find2020WithThree
 * @param {Array} list
 * @param {Number} target
 */
function find2020WithThree(list, target = 2020) {
	for (let i = 0; i < list.length; i++) {
		for (let j = 1; j < list.length; j++) {
			for (let k = 0; k < list.length; k++) {
				const firstOne = list[i];
				const secondOne = list[j];
				const thirdOne = list[k];
				if (firstOne + secondOne + thirdOne === target) {
					console.log("answer with 3 is:", firstOne * secondOne * thirdOne)
					return
				}
			}
		}
	}
}

/**
 * @description main
 */
async function main() {
	const list = await collectInputData();
	find2020WithTwo(list);
	find2020WithThree(list);
}

main();
