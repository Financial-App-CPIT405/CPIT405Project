import React, { useState } from "react";
import TransactionHistory from "./TransactionHistory";
import "./BudgetManager.css";

const BudgetManager = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newBudget, setNewBudget] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleSetBudget = () => {
    setBudget(newBudget);
    addTransaction("Set Budget", newBudget);
  };

  const handleAddExpense = () => {
    if (expenseAmount <= budget && selectedCategory !== "") {
      setExpenses([...expenses, { amount: expenseAmount, category: selectedCategory }]);
      setBudget(budget - expenseAmount);
      addTransaction(`Expense - ${selectedCategory}`, expenseAmount);
      setExpenseAmount(0); 
      setSelectedCategory('');
    } else {
      alert("Please select a category and ensure the expense does not exceed the current budget!");
    }
  };
  
  

  const addTransaction = (type, amount) => {
    const newTransaction = { type, amount };
    setTransactionHistory([...transactionHistory, newTransaction]);
  };

  return (
    <div>
      <h2>Budget Manager</h2>
      <label>
        Set Your Budget:
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(parseInt(e.target.value, 10))}
        />
      </label>
      <button onClick={handleSetBudget}>Set Budget</button>
      <p>Your Budget: {budget} USD</p>

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
