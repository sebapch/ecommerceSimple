import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
