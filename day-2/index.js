/**
 * @description Day 2: Password Philosophy
 */

const {createLineReader} = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = []
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			const regex = /^(\d+)\-(\d+)\s+([a-z])\:\s+([a-z]+)$/
			const [_, min, max, letter, value] = line.match(regex)
			list.push({
				min: Number(min),
				max: Number(max),
				letter,
				value
			})
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

/**
 * find valid password count by comparing the size
 * @param {Array} list
 */
function findValidPasswordsCountByComparingTheSize(list) {
	const validPasswordList = list.filter(item => {
		const size = item.value.split("").filter(letter => letter === item.letter).length;
		return size >= item.min && size <= item.max
	})
	console.log("The answer is:", validPasswordList.length)
}

/**
 * find valid password count by validating the position
 * @param {Array} list
 */
function findValidPasswordsCountByValidatingThePosition(list) {
	const validPasswordList = list.filter(item => {
		let count = 0;
		const firstIndex = item.min - 1;
		const lastIndex = item.max - 1;
		const letter = item.letter;
		const arr = item.value.split("");
		if (arr[firstIndex] === letter) {
			count++
		}
		if (arr[lastIndex] === letter) {
			count++
		}
		return count === 1
	})
	console.log("The answer is:", validPasswordList.length)
}

async function main() {
	const list = await collectInputData();
	findValidPasswordsCountByComparingTheSize(list);
	findValidPasswordsCountByValidatingThePosition(list);
}

main();