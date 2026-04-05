import React, { useContext, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const ChartsSection = () => {
  const { transactions } = useContext(FinanceContext);

  // --- Process Data for Line Chart (Balance Trend) ---
  const lineChartData = useMemo(() => {
    // Sort transactions by date (oldest to newest)
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    const dataByDate = {};

    // Group by date to handle multiple transactions on the same day
    sorted.forEach((tx) => {
      const amount = Number(tx.amount);
      if (tx.type === "income") {
        runningBalance += amount;
      } else {
        runningBalance -= amount;
      }
      
      // Update the balance for this date
      dataByDate[tx.date] = runningBalance;
    });

    // Convert object to array for Recharts
    return Object.keys(dataByDate).map(date => ({
      date: date,
      balance: dataByDate[date]
    }));
  }, [transactions]);


  // --- Process Data for Pie Chart (Expenses by Category) ---
  const pieChartData = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === "expense");
    const categoryTotals = {};

    expenses.forEach(tx => {
      if (categoryTotals[tx.category]) {
        categoryTotals[tx.category] += Number(tx.amount);
      } else {
        categoryTotals[tx.category] = Number(tx.amount);
      }
    });

    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
  }, [transactions]);

  // Colors for the Pie Chart slices
  const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* Line Chart Container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Balance Trend Over Time
        </h3>
        {lineChartData.length > 0 ? (
          <div className="h-64 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-400">
            Not enough data for chart
          </div>
        )}
      </div>

      {/* Pie Chart Container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Spending by Category
        </h3>
        {pieChartData.length > 0 ? (
          <div className="h-64 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}`}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-400">
            No expenses to show
          </div>
        )}
      </div>

    </div>
  );
};

export default ChartsSection;
