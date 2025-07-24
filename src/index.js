const fs = require("fs");
const { sourceFilePath, internalFilePath } = require("./config/paths");
const { readCSV } = require("./readers/csvReader");
const { compareTransactions } = require("./utils/comparer");

async function main() {
  try {
    const sourceData = await readCSV(sourceFilePath);
    const internalData = await readCSV(internalFilePath);

    const comparisonResult = compareTransactions(sourceData, internalData);

    console.log(JSON.stringify(comparisonResult, null, 2));
    fs.writeFileSync("result.json", JSON.stringify(comparisonResult, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
