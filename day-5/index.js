/**
 * @description Day 5: Binary Boarding
 */

const {
	createLineReader
} = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = [];
	const strMap = {
		"F": 1,
		"B": 0,
		"L": 1,
		"R": 0
	};
	const reader = createLineReader();
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			const seatList = line.split("").map(str => strMap[str]);
			let frontOrBackList = seatList.slice(0, 7);
			let leftOrRightList = seatList.slice(-3);
			let rowList = [...Array(128).keys()];
			let columnList = [...Array(8).keys()];
			for (const flag of frontOrBackList) {
				flag ? (rowList = rowList.slice(0, rowList.length / 2)) : (rowList = rowList.slice((rowList.length / 2)))
			}
			for (const flag of leftOrRightList) {
				flag ? columnList = columnList.slice(0, (columnList.length / 2)) : (columnList = columnList.slice((columnList.length / 2)))
			}
			list.push([rowList[0], columnList[0]])
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

function findHighestSeatId(list) {
	const result = list.map(item => {
		if (item[0] && item[1]) {
			return item[0] * 8 + item[1]
		}
		return 0
	}).sort((a,b) => (b - a));
	console.log("The answer is:", result[0])
}

async function main() {
	const list = await collectInputData();
	findHighestSeatId(list);
}

main();