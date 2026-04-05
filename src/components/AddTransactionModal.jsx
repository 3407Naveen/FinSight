import React, { useState } from "react";
import { X } from "lucide-react";

const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ 
    date: "", 
    amount: "", 
    category: "", 
    type: "expense" 
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.amount || !formData.category) return;
    
    onAdd({
      date: formData.date,
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type
    });
    
    setFormData({ date: "", amount: "", category: "", type: "expense" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Add New Transaction
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Date
            </label>
            <input 
              type="date" 
              required 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Amount (₹)
            </label>
            <input 
              type="number" 
              required 
              min="0" 
              step="0.01" 
              placeholder="0.00" 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Category
            </label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Groceries, Salary..." 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Type
            </label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})} 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              Save Transaction
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddTransactionModal;
