const { sheet1Path, sheet2Path } = require("./config/paths");
const { readCSV } = require("./readers/csvReader");
const { compareById } = require("./utils/comparer");

async function main() {
  try {
    const sheet1 = await readCSV(sheet1Path);
    const sheet2 = await readCSV(sheet2Path);

    const result = compareById(sheet1, sheet2);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
