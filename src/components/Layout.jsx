import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Moon, Sun, Wallet } from "lucide-react";

const Layout = ({ children }) => {
  const { role, setRole, darkMode, setDarkMode } = useContext(FinanceContext);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo and Title */}
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Wallet size={28} />
            <span className="font-bold text-xl tracking-tight">FinSight</span>
          </div>

          {/* Controls: Role Switcher & Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Role Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="role-select" className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
                Role:
              </label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-none rounded-md px-3 py-1.5 text-sm cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
