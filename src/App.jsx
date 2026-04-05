import React from "react";
import { FinanceProvider } from "./context/FinanceContext";
import Layout from "./components/Layout";
import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InsightsPanel from "./components/InsightsPanel";
import TransactionsSection from "./components/TransactionsSection";

function App() {
  return (
    <FinanceProvider>
      <Layout>
        {/* Main Dashboard Content */}
        <div className="space-y-6 animate-in fade-in duration-500">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Welcome back! Here is your financial summary.
            </p>
          </div>

          <SummaryCards />
          <ChartsSection />
          <InsightsPanel />
          <TransactionsSection />
        </div>
      </Layout>
    </FinanceProvider>
  );
}

export default App;
