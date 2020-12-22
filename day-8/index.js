/**
 * @description Day 8: Handheld Halting
 */

const { createLineReader } = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = []
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			const [action, sign] = line.split(" ")
			list.push({
				action,
				sign: Number(sign)
			})
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
};


let totalAcc = 0;
let actionMap = {};

/**
 * @description return accumulator when program index repeat
 * @param {Array} list
 * @param {Number} index
 */
function findAccumulator(list, index) {
	if (actionMap[index]) {
		console.log("the result is:", totalAcc);
		return
	}
	const item = list[index];
	actionMap[index] = true;
	if (item.action === "nop") {
		findAccumulator(list, index + 1);
	} else if (item.action === "acc") {
		totalAcc += item.sign;
		findAccumulator(list, index + 1);
	} else {
		findAccumulator(list, index + item.sign);
	}
}

/**
 * @description return accumulator when change action to reach the end of program
 * @param {Array} list
 * @param {Number} index
 */
function findAccumulatorWhenTerminateInTheEnd(list, index) {
	const item = list[index];
	if (!item) {
		console.log("the result is:", totalAcc);
		return
	}
	if (item.action === "nop") {
		findAccumulatorWhenTerminateInTheEnd(list, index + 1);
	} else if (item.action === "acc") {
		totalAcc += item.sign;
		findAccumulatorWhenTerminateInTheEnd(list, index + 1);
	} else {
		findAccumulatorWhenTerminateInTheEnd(list, index + item.sign);
	}
}

/**
 * @description main
 */
async function main() {
	const list = await collectInputData();

	// findAccumulator(list, 0);

	for (let index = 0; index < list.length; index++) {
		const item = list[index];
		const newList = list.map(i => ({...i})); // deep clone
		totalAcc = 0;
		if (item.action === "jmp") {
			newList[index].action = "nop"
		} else if (item.action === "nop") {
			newList[index].action = "jmp"
		} else {
			continue
		}
		try {
			findAccumulatorWhenTerminateInTheEnd(newList, 0);
			break;
		} catch (error) {
			console.log("error:", error)
			continue
		}
	}
}

main();