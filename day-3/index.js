/**
 * @description Day 3: Toboggan Trajectory
 */

const {createLineReader} = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = []
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		let index = 0;
		reader.on("line", (line) => {
			list[index] = line.split("")
			index++
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

function countingEncounteredTrees(list, right = 3, down = 1) {
	// const max = Math.max(list.length, list[0].length);
	// const min = Math.min(list.length, list[0].length);
	const max = list.length;
	const min = list[0].length;
	let count = 0;
	let hIndex = 0;
	for (let vIndex = 0; vIndex < max; vIndex+=down) {
		(list[vIndex][hIndex % min] === "#") && (count += 1)
		hIndex += right;
	}
	console.log("The answer is:", count);
	return count;
}

async function main() {
	const list = await collectInputData();
	const slopeList = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2]
	];
	const multipliedCount = slopeList.reduce((total, current) => {
		return countingEncounteredTrees(list, current[0], current[1]) * total
	}, 1);
	console.log("The answer is:", multipliedCount);
}

main();