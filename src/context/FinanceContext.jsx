/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useState, useEffect } from "react";
import { initialTransactions } from "../mockData";

export const FinanceContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "EDIT":
      return state.map((tx) =>
        tx.id === action.payload.id ? { ...tx, ...action.payload } : tx
      );
    case "DELETE":
      return state.filter((tx) => tx.id !== action.payload);
    case "SET_ALL":
      return action.payload;
    default:
      return state;
  }
};

export const FinanceProvider = ({ children }) => {
  // Simple UI State
  const [role, setRole] = useState("Viewer");
  const [darkMode, setDarkMode] = useState(false);

  // Complex Data State via useReducer
  const [transactions, dispatch] = useReducer(transactionReducer, [], () => {
    const saved = localStorage.getItem("finsight_transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("finsight_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // --- Core Action Dispatchers ---
  // Wrapping dispatcher logic so consuming components don't have to know action types
  const addTransaction = (transaction) => {
    if (role !== "Admin") return;
    dispatch({
      type: "ADD",
      payload: { ...transaction, id: Date.now().toString() },
    });
  };

  const editTransaction = (id, updatedData) => {
    if (role !== "Admin") return;
    dispatch({
      type: "EDIT",
      payload: { id, ...updatedData },
    });
  };

  const deleteTransaction = (id) => {
    if (role !== "Admin") return;
    dispatch({ type: "DELETE", payload: id });
  };

  // --- Derived State (High-level metrics) ---
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const currentBalance = totalIncome - totalExpense;

  const contextValue = {
    role,
    setRole,
    darkMode,
    setDarkMode,
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    currentBalance,
  };

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};
