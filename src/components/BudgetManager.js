import React, { useState } from "react";
import TransactionHistory from "./TransactionHistory";
import "./BudgetManager.css";

const BudgetManager = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newBalance, setNewBalance] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleSetBalance = () => {
    setBalance(newBalance);
    addTransaction("Set Balance", newBalance);
  };

  const handleAddExpense = () => {
    if (expenseAmount <= balance && selectedCategory !== "") {
      setExpenses([...expenses, { amount: expenseAmount, category: selectedCategory }]);
      setBalance(balance - expenseAmount);
      addTransaction(`Expense - ${selectedCategory}`, expenseAmount);
      setExpenseAmount(0);
      setSelectedCategory('');
    } else {
      alert("Please select a category and ensure the expense does not exceed the current balance!");
    }
  };

  const addTransaction = async (type, amount) => {
   
      const response = await fetch('http://localhost:3000/BackEnd/api/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, amount }),
      });

      if (response.ok) {
        const newTransaction = { type, amount };
        setTransactionHistory([...transactionHistory, newTransaction]);
      } else {
        console.error('Failed to add transaction');
      }
  };

  return (
    <div>
      <h2>Balance Manager</h2>
      <label>
        Set Your Balance:
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(parseInt(e.target.value, 10))}
        />
      </label>
      <button onClick={handleSetBalance}>Set Balance</button>
      <p>Your Balance: {balance} USD</p>

      <label>
        Add Expense:
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(parseInt(e.target.value, 10))}
        />
      </label>

      <label>
        Select Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {["Shopping", "Food", "Entertainment", "Others"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleAddExpense}>Add Expense</button>

      <p>Total Expenses: {expenses.reduce((total, expense) => total + expense.amount, 0)} USD</p>
      
      <TransactionHistory transactions={transactionHistory} addTransaction={addTransaction} />
    </div>
  );
};

export default BudgetManager;
