function compareTransactions(sourceData, internalData) {
  const missingInInternal = [];
  const missingInSource = [];
  const mismatchedTransactions = [];

  const sourceMap = new Map();
  const internalMap = new Map();

  sourceData.forEach((row) => {
    sourceMap.set(row.providerTransactionId, row);
  });

  internalData.forEach((row) => {
    internalMap.set(row.transactionId, row);
  });

  // Check missing in internal and mismatches
  for (const [txnId, sourceRow] of sourceMap.entries()) {
    if (!internalMap.has(txnId)) {
      missingInInternal.push(sourceRow);
    } else {
      const internalRow = internalMap.get(txnId);
      const discrepancies = {};

      if (parseFloat(sourceRow.amount) !== parseFloat(internalRow.amount)) {
        discrepancies.amount = {
          source: parseFloat(sourceRow.amount),
          system: parseFloat(internalRow.amount),
        };
      }

      if (sourceRow.status !== internalRow.status) {
        discrepancies.status = {
          source: sourceRow.status,
          system: internalRow.status,
        };
      }

      if (Object.keys(discrepancies).length > 0) {
        mismatchedTransactions.push({
          transactionId: txnId,
          discrepancies,
        });
      }
    }
  }

  // Check missing in source
  for (const [txnId, internalRow] of internalMap.entries()) {
    if (!sourceMap.has(txnId)) {
      missingInSource.push(internalRow);
    }
  }

  return {
    missing_in_internal: missingInInternal,
    missing_in_source: missingInSource,
    mismatched_transactions: mismatchedTransactions,
  };
}

module.exports = { compareTransactions };
