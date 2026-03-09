/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
 if (!Array.isArray(transactions) || transactions.length === 0) {
    return null;
  }

  // Keep only valid transactions
  const validTransactions = transactions.filter((tx) => {
    return (
      tx &&
      typeof tx === "object" &&
      typeof tx.amount === "number" &&
      Number.isFinite(tx.amount) &&
      tx.amount > 0 &&
      (tx.type === "credit" || tx.type === "debit")
    );
  });

  // Return null if no valid transactions remain
  if (validTransactions.length === 0) {
    return null;
  }

  const totalCredit = validTransactions.reduce((sum, tx) => {
    return tx.type === "credit" ? sum + tx.amount : sum;
  }, 0);

  const totalDebit = validTransactions.reduce((sum, tx) => {
    return tx.type === "debit" ? sum + tx.amount : sum;
  }, 0);

  const transactionCount = validTransactions.length;

  const totalAmount = validTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const avgTransaction = Math.round(totalAmount / transactionCount);

  const highestTransaction = validTransactions.reduce((highest, tx) => {
    return tx.amount > highest.amount ? tx : highest;
  }, validTransactions[0]);

  const categoryBreakdown = validTransactions.reduce((acc, tx) => {
    const category = tx.category || "uncategorized";
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});

  // Count frequency of "to"
  const contactCounts = validTransactions.reduce((acc, tx) => {
    const contact = tx.to || "";
    if (!acc[contact]) {
      acc[contact] = 1;
    } else {
      acc[contact] += 1;
    }
    return acc;
  }, {});

  // Tie -> whichever appears first
  let frequentContact = validTransactions[0].to || "";
  let maxCount = contactCounts[frequentContact] || 0;

  for (const tx of validTransactions) {
    const contact = tx.to || "";
    if ((contactCounts[contact] || 0) > maxCount) {
      maxCount = contactCounts[contact];
      frequentContact = contact;
    }
  }

  const allAbove100 = validTransactions.every((tx) => tx.amount > 100);

  const hasLargeTransaction = validTransactions.some((tx) => tx.amount >= 5000);

  return {
    totalCredit,
    totalDebit,
    netBalance: totalCredit - totalDebit,
    transactionCount,
    avgTransaction,
    highestTransaction,
    categoryBreakdown,
    frequentContact,
    allAbove100,
    hasLargeTransaction,
  };

}

 
 