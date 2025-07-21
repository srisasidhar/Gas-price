import React from 'react';
import GasPriceList from './GasPriceList'; // This is correct if both files are in the same directory

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Gas Price Tracker!</h1>
      <p>This application will help you track gas prices across different chains in real-time.</p>
      <GasPriceList /> {/* Add this line to render the GasPriceList component */}
    </div>
  );
};

export default HomePage;
