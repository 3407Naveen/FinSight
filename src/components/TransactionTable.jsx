import React from "react";
import { Trash2 } from "lucide-react";

const TransactionTable = ({ transactions, role, deleteTransaction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
            <th className="font-medium py-3 px-4">Date</th>
            <th className="font-medium py-3 px-4">Category</th>
            <th className="font-medium py-3 px-4">Type</th>
            <th className="font-medium py-3 px-4 text-right">Amount</th>
            {role === "Admin" && <th className="font-medium py-3 px-4 text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-sm">
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-slate-800 dark:text-slate-100 font-medium">
                  {tx.category}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-3 px-4 text-right font-semibold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'}`}>
                  {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                </td>
                
                {role === "Admin" && (
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-md transition-colors"
                      title="Delete Transaction"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === "Admin" ? 5 : 4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                No transactions found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
