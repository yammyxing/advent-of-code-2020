/**
 * @description Day 4: Passport Processing
 */

const {
	createLineReader
} = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const list = []
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		let index = 0;
		reader.on("line", (line) => {
			if (line === "") {
				index++
				return
			}
			let obj = {}
			if (line.includes(" ")) {
				line.split(" ").map(item => {
					const arr = item.split(":")
					obj[arr[0]] = arr[1]
				})
			} else {
				const arr = line.split(":")
				obj[arr[0]] = arr[1]
			}
			list[index] = { ...list[index], ...obj };
		})
		reader.on("close", () => {
			resolve(list)
		})
	})
}

function fundValidPassportCountInStrictRule(list) {
	const requiredFieldsList = [
		{
			key: "byr",
			pattern: (value) => {
				if (!value) {
					return false
				}
				const number = Number(value)
				return number >= 1920 && number <= 2002;
			}
		},
		{
			key: "iyr",
			pattern: (value) => {
				if (!value) {
					return false
				}
				const number = Number(value)
				return number >= 2010 && number <= 2020;
			}
		},
		{
			key: "eyr",
			pattern: (value) => {
				if (!value) {
					return false
				}
				const number = Number(value)
				return number >= 2020 && number <= 2030;
			}
		},
		{
			key: "hgt",
			pattern: (value) => {
				if (!value) {
					return false
				}
				const unit = value.slice(-2);
				const number = Number(value.slice(0, -2));
				return (unit === "cm" && number >= 150 && number <= 193) || (unit === "in" && number >= 59 && number <= 76)
			}
		},
		{
			key: "hcl",
			pattern: (value) => {
				if (!value) {
					return false
				}
				return /^#[a-f0-9]{6}$/.test(value);
			}
		},
		{
			key: "ecl",
			pattern: (value) => {
				if (!value) {
					return false
				}
				return ["amb", "blu", "brn", "gry", "grn", "hzl", 'oth'].includes(value)
			}
		},
		{
			key: "pid",
			pattern: (value) => {
				if (!value) {
					return false
				}
				return /\d{9}/.test(value)
			}
		},
		// "cid"
	]
	const result = list.filter(item => {
		let count = 0;
		for (const field of requiredFieldsList) {
			if (field.pattern(item[field.key])) {
				count++
			}
		}
		return count === requiredFieldsList.length
	}).length
	console.log("The answer is :", result)
}

function fundValidPassportCount(list) {
	const requiredFieldsList = [
		"byr",
		"iyr",
		"eyr",
		"hgt",
		"hcl",
		"ecl",
		"pid",
		// "cid"
	]
	const result = list.filter(item => {
		let count = 0;
		for (const key of requiredFieldsList) {
			(!!item[key]) && (count++)
		}
		return count === requiredFieldsList.length
	}).length
	console.log("The answer is :", result)
}

async function main() {
	const list = await collectInputData();
	fundValidPassportCount(list);
	fundValidPassportCountInStrictRule(list);
}

main();