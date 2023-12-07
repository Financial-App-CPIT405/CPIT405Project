import React, { useState } from "react";

const StockMarketInfo = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async () => {

      const apiKey = "HVR39NOR65VDWSQD";

      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`,
      );
      const data = await response.json();

      const latestDate = Object.keys(data["Time Series (Daily)"])[0];
      const latestInfo = data["Time Series (Daily)"][latestDate];

      setStockData({
        symbol: data["Meta Data"]["2. Symbol"],
        lastRefreshed: data["Meta Data"]["3. Last Refreshed"],
        open: latestInfo["1. open"],
        high: latestInfo["2. high"],
        low: latestInfo["3. low"],
        close: latestInfo["4. close"],
        volume: latestInfo["5. volume"],
      });
    
  };

  return (
    <div>
      <h2>Stock Market Information</h2>
      <label>
        Stock Symbol:
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={fetchStockData}>Fetch Stock Data</button>
      {stockData && (
        <div>
          <p>Symbol: {stockData.symbol}</p>
          <p>Last Refreshed: {stockData.lastRefreshed}</p>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
};

export default StockMarketInfo;
