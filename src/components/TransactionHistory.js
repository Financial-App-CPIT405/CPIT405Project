// TransactionHistory.js
import React from "react";
import "./TransactionHistory.css";

const TransactionHistory = ({ transactions, addTransaction }) => {
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type}: {transaction.amount} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
