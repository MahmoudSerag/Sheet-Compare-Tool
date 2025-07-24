# 🧾 Sheet-Compare-Tool

## Description

🎉 A lightweight Node.js tool to compare two CSV files (representing transaction records) and identify:
`Built with performance and clarity in mind, using Set-based comparison and modular file structure.`

---

## 🏆 Challenge Context

This project is a solution to the **Extreme Solution - Backend Software Engineer Hiring Challenge (Q2/2025)**.

The challenge was to build a reconciliation service that reads transaction data from two CSV files—one from an external provider (e.g., Stripe/PayPal) and one from an internal system—and outputs a structured report identifying:

- Transactions missing from the internal system
- Transactions missing from the external source
- Transactions that exist in both but have mismatched `amount` or `status`

---

## ✨ Features

- Compare by transaction ID
- Identify transactions present in one file but missing in the other
- Detect mismatches in fields like `amount` and `status`
- Fast and efficient using `Map` structures for constant-time lookups
- JSON response structure suitable for further processing or logging

---

## 📁 CSV Input Format

- The **external file** (`source_transactions.csv`) contains records with:

  - `providerTransactionId`, `amount`, `currency`, `status`, `etc...`

- The **internal file** (`system_transactions.csv`) contains records with:
  - `transactionId`, `amount`, `currency`, `status`, `etc...`

## Both files are assumed to be located in the `./data/` directory

---

## 📁 Folder Structure

sheet-compare-tool/
│
├── data/
│ ├── source_transactions.csv # Source file (external system)
│ └── system_transactions.csv # Internal system file
│
├── node_modules/ # Installed dependencies (auto-generated)
│
├── src/
│ ├── config/
│ │ └── paths.js # Paths to input CSV files
│ │
│ ├── readers/
│ │ └── csvReader.js # CSV reading and parsing utility
│ │
│ ├── utils/
│ │ └── comparer.js # Main comparison logic
│ │
│ └── index.js # Entry point that ties everything together
│
├── result.json # Final output result (in JSON)
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md # Project documentation

---

## 🚀 Setup Instructions

- **Clone the repository**

  ```bash
  git clone git@github.com:MahmoudSerag/Sheet-Compare-Tool.git
  cd sheet-compare-tool
  ```

- **✨ Install dependencies**

  - npm install

- **✨ Run the tool**

  - npm start

---

## Expected Output

After running the script, the output will be a JSON object like the following:

```json
{
  "missing_in_internal": [
    {
      "providerTransactionId": "txn_99999",
      "amount": 200.0,
      "currency": "USD",
      "status": "succeeded"
    }
  ],
  "missing_in_source": [
    {
      "transactionId": "txn_77777",
      "amount": 50.0,
      "currency": "USD",
      "status": "completed"
    }
  ],
  "mismatched_transactions": [
    {
      "transactionId": "txn_12345",
      "discrepancies": {
        "amount": {
          "source": 150.0,
          "system": 145.0
        },
        "status": {
          "source": "succeeded",
          "system": "completed"
        }
      }
    }
  ]
}
```

---

## 🧠 Technical Design Rationale

- CSV Parsing: We use the `csv-parser` npm package for fast, stream-based CSV parsing.
- Separation of Concerns: File parsing logic is isolated in utils/csvReader.js, while comparison logic is handled in `comparer.js.`
- Set Comparison: Transaction IDs are indexed in `Map` structures for O(1) lookup to efficiently identify missing or mismatched entries.
- Field-Level Discrepancy Detection: For shared IDs, both `amount` and `status` are compared individually to detect partial mismatches.
- Modular Output: Output is cleanly divided into `missing_in_internal`, `missing_in_source`, and `mismatched_transactions` for ease of use.

---

## 🔍 Code Review Notes

- ✅ Clear separation between reading and processing logic

- ✅ Comments are added at key logic blocks

- ✅ Output is deterministic and easy to test

---

## 📌 Requirements

- Node.js v14 or higher

- Two valid CSV files with `transactionId`, `amount`, `status`
