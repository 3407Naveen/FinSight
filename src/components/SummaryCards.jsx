import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";

const SummaryCards = () => {
  // Get calculated totals from our context
  const { totalIncome, totalExpense, currentBalance } = useContext(FinanceContext);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Balance Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 flex items-center justify-between border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {formatCurrency(currentBalance)}
          </h3>
        </div>
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full text-indigo-600 dark:text-indigo-400">
          <DollarSign size={24} />
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 flex items-center justify-between border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Income</p>
          <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalIncome)}
          </h3>
        </div>
        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-full text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight size={24} />
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 flex items-center justify-between border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Expenses</p>
          <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalExpense)}
          </h3>
        </div>
        <div className="bg-rose-100 dark:bg-rose-900/50 p-4 rounded-full text-rose-600 dark:text-rose-400">
          <ArrowDownRight size={24} />
        </div>
      </div>
      
    </div>
  );
};

export default SummaryCards;
