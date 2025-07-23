function compareById(sheet1, sheet2) {
  const ids2 = new Set(sheet2.map((row) => row.providerTransactionId));
  const ids1 = new Set(sheet1.map((row) => row.providerTransactionId));

  const onlyIn1 = sheet1.filter((row) => !ids2.has(row.providerTransactionId));
  const onlyIn2 = sheet2.filter((row) => !ids1.has(row.providerTransactionId));

  return { onlyIn1, onlyIn2 };
}

module.exports = { compareById };
