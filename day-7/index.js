/**
 * @description Day 1: Report Repair
 */

const { createLineReader } = require("../helper");

/**
 * @description collect data from markdown file
 */
function collectInputData() {
	const bagDetailMap = {};
	const reader = createLineReader()
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			const regex = /^(.+) bags contain(.+)./;
			const [_, mainColor, subColor] = line.match(regex);
			const subColorList = subColor.split(",")
			bagDetailMap[mainColor] = subColorList.map(item => {
				const [_, subColorNumber, subColorStr] = item.match(/^ (\d|no) (.+) bags?/)
				return {
					no: subColorNumber,
					color: subColorStr
				}
			});
		})
		reader.on("close", () => {
			resolve(bagDetailMap)
		})
	})
}

let count = 0;
let colorMap = {};

function collect(list, map) {
	for (const item of list) {
		console.log(`item in ${new Date}:`, item);
		if (item.no === "no") {
			continue
		}
		if (!colorMap[item.color]) {
			count++
			colorMap[item.color] = true
		}
		collect(map[item.color], map)
	}
	console.log("count:", count, colorMap)
}

/**
 * @description main
 */
async function main() {
	const mapObj = await collectInputData();
	const beginColor = "shiny gold";
	const list = mapObj[beginColor];

	collect(list, mapObj);
}

main();