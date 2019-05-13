import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const tickers = ["FB", "GOOG", "AAPL", "HOG"]

ReactDOM.render(<App tickers={tickers} />, document.getElementById('root'));