import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [coinPrice, setCoinPrice] = useState(0);

  const onCoinChange = (event) => {
    const coinInfoArray = event.target.value.split(" ");
    setSymbol(
      coinInfoArray[coinInfoArray.length - 3].substr(
        1,
        coinInfoArray[coinInfoArray.length - 3].length - 3
      )
    );
    setCoinPrice(Number(coinInfoArray[coinInfoArray.length - 2]));
    console.log(symbol);
    console.log(coinPrice);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`} </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onCoinChange}>
          <option>Choose your Coin...</option>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
