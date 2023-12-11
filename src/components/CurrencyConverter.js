import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  const currencyOptions = [
    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SOS", "SRD", "SSP",
    "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD",
    "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND",
    "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW",
    "ZWL"
  ];

  const fetchExchangeRates = async () => {
    const apiKey = "dec854134e454b2d41067cb7";
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${sourceCurrency}/${targetCurrency}`
    );
    const data = await response.json();
    setExchangeRate(data.conversion_rate);
    setConvertedAmount(amount * data.conversion_rate);
  };

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
        <select
          value={sourceCurrency}
          onChange={(e) => handleSourceCurrencyChange(e.target.value)}
        >
          <option value="">Select Source Currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
          <option value="other">Other (Type Currency Code)</option>
        </select>
      </label>
      {sourceCurrency === "other" && (
        <input
          type="text"
          placeholder="Enter source currency code"
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value.toUpperCase())}
        />
      )}
      <label>
        Target Currency:
        <select
          value={targetCurrency}
          onChange={(e) => handleTargetCurrencyChange(e.target.value)}
        >
          <option value="">Select Target Currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
          <option value="other">Other (Type Currency Code)</option>
        </select>
      </label>
      {targetCurrency === "other" && (
        <input
          type="text"
          placeholder="Enter target currency code"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
        />
      )}
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
