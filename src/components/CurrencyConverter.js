import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  const fetchExchangeRates = async () => {
       const apiKey = "dec854134e454b2d41067cb7";
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${sourceCurrency}/${targetCurrency}`,
      );
      const data = await response.json();
      setExchangeRate(data.conversion_rate);
      
      setConvertedAmount(amount * data.conversion_rate);
    
  };

  // Reset conversion values when the user changes source or target currency
  const handleSourceCurrencyChange = (newSourceCurrency) => {
    setSourceCurrency(newSourceCurrency.toUpperCase());
    setConvertedAmount(0);
    setExchangeRate(0);
  };

  const handleTargetCurrencyChange = (newTargetCurrency) => {
    setTargetCurrency(newTargetCurrency.toUpperCase());
    setConvertedAmount(0);
    setExchangeRate(0);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <label>
        Source Currency:
        <input
          type="text"
          placeholder="Enter source currency"
          value={sourceCurrency}
          onChange={(e) => handleSourceCurrencyChange(e.target.value)}
        />
      </label>
      <label>
        Target Currency:
        <input
          type="text"
          placeholder="Enter target currency"
          value={targetCurrency}
          onChange={(e) => handleTargetCurrencyChange(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={fetchExchangeRates}>Convert</button>
      {exchangeRate > 0 && (
        <div>
          <p>
            Exchange Rate: 1 {sourceCurrency} = {exchangeRate} {targetCurrency}
          </p>
          <p>Converted Amount: {convertedAmount} {targetCurrency}</p>
        </div>
      )}
    </div>
  );
};
  
export default CurrencyConverter;
