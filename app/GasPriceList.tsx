"use client";

import React, { useEffect, useState } from 'react';

const GasPriceList: React.FC = () => {
  const [gasPrices, setGasPrices] = useState<{ chain: string; price: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGasPrices = async () => {
    setLoading(true);
    try {
      // Fetch gas price from Ethereum
      const ethResponse = await fetch('https://eth-mainnet.g.alchemy.com/v2/keEdgdH5CzSvMABWIOD9CuQPBZImKALl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_gasPrice',
          params: [],
        }),
      });
      const ethData = await ethResponse.json();
      const ethGasPriceInGwei = parseInt(ethData.result, 16) / 1e9;
      const ethCurrentPrice = ethGasPriceInGwei.toFixed(2);

      // Fetch gas price from Polygon
      const polygonResponse = await fetch('https://polygon-mainnet.g.alchemy.com/v2/V7Gvr9ZBTwkDvN6cDf1mq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_gasPrice',
          params: [],
        }),
      });
      const polygonData = await polygonResponse.json();
      const polygonGasPriceInGwei = parseInt(polygonData.result, 16) / 1e9;
      const polygonCurrentPrice = polygonGasPriceInGwei.toFixed(2);

      // Set gas prices
      setGasPrices([
        { chain: 'Ethereum', price: `${ethCurrentPrice} Gwei` },
        { chain: 'Polygon', price: `${polygonCurrentPrice} Gwei` },
      ]);
    } catch (error) {
      console.error('Error fetching gas prices:', error);
      setError('Failed to fetch gas prices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGasPrices();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {gasPrices.map((gasPrice) => (
          <li key={gasPrice.chain}>
            {gasPrice.chain}: {gasPrice.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GasPriceList;
