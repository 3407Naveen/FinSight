import { useContext, useMemo, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

/**
 * Custom hook to abstract complex filtering, searching, and sorting logic
 * out of the UI components.
 */
export function useTransactions() {
  const { transactions, role, addTransaction, deleteTransaction, editTransaction } = useContext(FinanceContext);

  // Local state for UI filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Compute the derived transactions array based on filters
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by Category Search
    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter((tx) =>
        tx.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by Income/Expense
    if (filterType !== "all") {
      result = result.filter((tx) => tx.type === filterType);
    }

    // Sort the dataset
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      const amountA = Number(a.amount);
      const amountB = Number(b.amount);

      switch (sortBy) {
        case "date-desc":
          return dateB - dateA;
        case "date-asc":
          return dateA - dateB;
        case "amount-desc":
          return amountB - amountA;
        case "amount-asc":
          return amountA - amountB;
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, searchTerm, filterType, sortBy]);

  return {
    transactions: processedTransactions,
    originalTransactions: transactions,
    role,
    addTransaction,
    deleteTransaction,
    editTransaction,
    
    // UI Filter Controls
    filters: {
      searchTerm,
      setSearchTerm,
      filterType,
      setFilterType,
      sortBy,
      setSortBy,
    }
  };
}
