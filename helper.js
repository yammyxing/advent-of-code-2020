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

module.exports = {
	createLineReader
}