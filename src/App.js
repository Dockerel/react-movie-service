import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollars] = useState(1);
  const [price, setPrice] = useState(1);

  const onCoinChange = (event) => {
    console.log(event.target.value);
    const coinInfoArray = event.target.value.split(" ");
    setPrice(Number(coinInfoArray[coinInfoArray.length - 2]));
  };

  const onDollarChange = (event) => {
    setDollars(event.target.value);
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
      <br />
      <input type="number" value={dollar} onChange={onDollarChange}></input>
      <h2>{dollar / price}</h2>
    </div>
  );
}

export default App;
