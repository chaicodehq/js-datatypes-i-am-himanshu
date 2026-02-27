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
  let totalCredit = 0, totalDebit = 0, netBalance, transactionCount = 0, avgTransaction, highestTransaction, categoryBreakdown = {}, freq = {}, frequee, frequentContact, allAbove100 = true, hasLargeTransaction = false, maxi = -1e9, flag = false;
  if(Array.isArray(transactions) && transactions.length > 0){
    for(let i=0;i<transactions.length;i++){
      if(transactions[i].amount > 0 && (transactions[i].type.toLowerCase() === "credit" || transactions[i].type.toLowerCase() === "debit" || false)){
        if(transactions[i].type.toLowerCase() === "credit"){
          totalCredit += transactions[i].amount;
        } else {
          totalDebit += transactions[i].amount;
        }
        transactionCount += 1;
        console.log(transactionCount);
        if(transactions[i].amount >= maxi) {
          highestTransaction = transactions[i];
          maxi = transactions[i].amount;
        }
        if(categoryBreakdown.hasOwnProperty(transactions[i].category)){
          categoryBreakdown[transactions[i].category] += transactions[i].amount;
        } else {
          categoryBreakdown[transactions[i].category] = transactions[i].amount;
        }
        if(transactions[i].amount >= 5000){
          hasLargeTransaction = true;
        }
        if(freq.hasOwnProperty(transactions[i].to)){
          freq[transactions[i].to] += 1;
        } else {
          freq[transactions[i].to] = 1;
        }
        if(transactions[i].amount <= 100){
          allAbove100 = false;
        }
        flag = true;
      }
    }
    if(flag){
      netBalance = totalCredit - totalDebit;
      avgTransaction = Math.round((totalCredit + totalDebit) / transactionCount);
      frequee = Object.entries(freq);
      maxi = -1e9;
      for(let i=0;i<frequee.length;i++){
        if(frequee[i][1] > maxi){
          frequentContact = frequee[i][0];
          maxi = frequee[i][1];
        }
      }
      return { totalCredit: totalCredit, totalDebit: totalDebit, netBalance: netBalance, transactionCount: transactionCount, avgTransaction: avgTransaction, highestTransaction: highestTransaction, categoryBreakdown: categoryBreakdown, frequentContact: frequentContact, allAbove100: allAbove100, hasLargeTransaction: hasLargeTransaction };
    } else {
      return null;
    }
  }

  return null;
}
