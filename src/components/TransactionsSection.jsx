import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import AddTransactionModal from "./AddTransactionModal";

const TransactionsSection = () => {
  const { 
    transactions, 
    role, 
    addTransaction, 
    deleteTransaction, 
    filters 
  } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700 mb-8 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Transactions
        </h2>
        
        {role === "Admin" && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Extracted Filter Controls */}
      <TransactionFilters filters={filters} />

      {/* Extracted Table */}
      <TransactionTable 
        transactions={transactions} 
        role={role} 
        deleteTransaction={deleteTransaction} 
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={addTransaction}
      />
      
    </div>
  );
};

export default TransactionsSection;
