const path = require("path");

module.exports = {
  sourceFilePath: path.resolve(__dirname, "../../data/source_transactions.csv"),
  internalFilePath: path.resolve(__dirname, "../../data/system_transactions.csv"),
};
