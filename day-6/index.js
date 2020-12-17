/**
 * @description Day 6: Custom Customs
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
			list.push(line);
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

function getValidCount(list) {
	let index = 0;
	let arr = [];
	for (let i = 0; i < list.length; i++) {
		const line = list[i];
		if (line === "") {
			index++
			continue
		}
		arr[index] = [...arr[index] || [], ...line.split("")];
	}
	return arr.map(item => [...new Set(item)].length).reduce((acc, curr) => (acc + curr), 0);
}

function _getIntersection(...arrList) {
	return Array.from(new Set(arrList.reduce((total, arr) => {
		return arr.filter(item => total.includes(item));
	})));
}

function getAgreedValidCount(list) {
	let index = 0;
	let arr = [];
	for (const line of list) {
		if (line === "") {
			index++
			continue
		}
		const acc = arr[index];
		if (!acc) {
			arr[index] = line.split("");
		} else {
			const tmpArr = _getIntersection(arr[index], line.split(""));
			arr[index] = tmpArr
		}
	}
	return arr.map(item => item.length).reduce((acc, curr) => (acc + curr), 0);
}

/**
 * @description main
 */
async function main() {
	const list = await collectInputData();
	// console.log("====list====:", list);
	const result = getValidCount(list);
	console.log("The result is:", result);
	const agreedResult = getAgreedValidCount(list);
	console.log("The answer is:", agreedResult);
}

main();