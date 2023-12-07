import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/home";
import BudgetManager from "./components/BudgetManager";
import FinancialGoals from "./components/FinancialGoals";
import CurrencyConverter from "./components/CurrencyConverter";
import StockMarketInfo from "./components/StockMarketInfo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/budget">Budget Manager</Link>
              </li>
              <li>
                <Link to="/financial-goals">Financial Goals</Link>
              </li>
              <li>
                <Link to="/currency-converter">Currency Converter</Link>
              </li>
              <li>
                <Link to="/stock-market">Stock Market Info</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<BudgetManager />} />
            <Route path="/financial-goals" element={<FinancialGoals />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/stock-market" element={<StockMarketInfo />} />
          </Routes>
        </main>

        <footer>
          <p>Finance App (CPIT405)</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
