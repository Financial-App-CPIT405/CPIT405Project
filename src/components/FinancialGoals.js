import React, { useState } from "react";

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [updateAmounts, setUpdateAmounts] = useState([]);

  const handleAddGoal = () => {
    const newGoal = {
      name: goalName,
      amount: goalAmount,
      progress: 0,
    };
    setGoals([...goals, newGoal]);
    // Reset input fields
    setGoalName("");
    setGoalAmount(0);
    setUpdateAmounts([...updateAmounts, 0]);
  };

  const handleUpdateProgress = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].progress += updateAmounts[index];
    setGoals(updatedGoals);
    // Reset updateAmount field for the specific goal
    setUpdateAmounts((prev) => {
      const newUpdateAmounts = [...prev];
      newUpdateAmounts[index] = 0;
      return newUpdateAmounts;
    });
  };

  const handleUpdateAmountChange = (index, value) => {
    setUpdateAmounts((prev) => {
      const newUpdateAmounts = [...prev];
      newUpdateAmounts[index] = value;
      return newUpdateAmounts;
    });
  };

  return (
    <div>
      <h2>Financial Goals</h2>

      <label>
        Goal Name:
        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
      </label>

      <label>
        Goal Amount:
        <input
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(parseInt(e.target.value, 10))}
        />
      </label>

      <button onClick={handleAddGoal}>
        Add Goal
      </button>

      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            {goal.name} - Goal Amount: {goal.amount} USD - Progress: {goal.progress.toFixed(2)} USD
            <label>
              Update Progress:
              <input
                type="number"
                value={updateAmounts[index]}
                onChange={(e) => handleUpdateAmountChange(index, parseInt(e.target.value, 10))}
              />
            </label>
            <button onClick={() => handleUpdateProgress(index)}>
              Update Progress
            </button>
          </li>
        ))}
      </ul>
      {/* Additional functionality for tracking goal progress */}
    </div>
  );
};

export default FinancialGoals;
