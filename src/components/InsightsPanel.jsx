import React, { useContext, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Lightbulb, TrendingUp, AlertCircle, TrendingDown } from "lucide-react";

const InsightsPanel = () => {
  const { transactions, totalIncome, totalExpense } = useContext(FinanceContext);

  const insights = useMemo(() => {
    const data = {
      highestCategory: "None",
      highestAmount: 0,
      savingsRate: 0,
      recentAlert: null
    };

    const expenses = transactions.filter((tx) => tx.type === "expense");
    
    // 1. Calculate Highest Spending Category
    if (expenses.length > 0) {
      const categoryTotals = expenses.reduce((acc, tx) => {
        const amount = Number(tx.amount);
        acc[tx.category] = (acc[tx.category] || 0) + amount;
        return acc;
      }, {});
      
      const highest = Object.entries(categoryTotals).reduce((a, b) => (a[1] > b[1] ? a : b));
      data.highestCategory = highest[0];
      data.highestAmount = highest[1];
    }

    // 2. Calculate Savings Rate
    if (totalIncome > 0) {
      const rate = ((totalIncome - totalExpense) / totalIncome) * 100;
      data.savingsRate = Math.max(0, rate).toFixed(1);
    }

    // 3. Simple Alerting Logic
    if (totalExpense > totalIncome && totalIncome > 0) {
      data.recentAlert = "Warning: Your total expenses have exceeded your income!";
    } else if (expenses.some((tx) => Number(tx.amount) > 1000)) {
      data.recentAlert = "Large singular expense detected over $1,000.";
    }

    return data;
  }, [transactions, totalIncome, totalExpense]);

  return (
    <div className="bg-indigo-50 dark:bg-slate-800 rounded-xl shadow-sm border border-indigo-100 dark:border-slate-700 p-6 mb-8">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" size={20} />
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Insight 1: Highest Spending */}
        <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg flex items-start gap-3 shadow-sm border border-slate-100 dark:border-slate-600/50">
          <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-full text-rose-600 dark:text-rose-400 mt-0.5">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Top Expense
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {insights.highestAmount > 0 
                ? `${insights.highestCategory} ($${insights.highestAmount.toFixed(2)})`
                : "No expenses recorded"}
            </p>
          </div>
        </div>

        {/* Insight 2: Savings Rate */}
        <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg flex items-start gap-3 shadow-sm border border-slate-100 dark:border-slate-600/50">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-full text-emerald-600 dark:text-emerald-400 mt-0.5">
            <TrendingDown size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Savings Rate
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {totalIncome > 0 ? `${insights.savingsRate}% of Income` : "No income to track"}
            </p>
          </div>
        </div>

        {/* Insight 3: Alerts */}
        {insights.recentAlert && (
          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg flex items-start gap-3 shadow-sm border border-amber-100 dark:border-amber-900/30">
            <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full text-amber-600 dark:text-amber-400 mt-0.5">
              <AlertCircle size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Alert
              </p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {insights.recentAlert}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
