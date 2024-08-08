import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
      } catch (error) {
        window.alert('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      const newPrices = {};
      for (const product of products) {
        if (product.skus && product.skus.length > 0) {
          try {
            const response = await axios.get(`http://localhost:3001/api/stock-price/${product.skus[0].code}`);
            newPrices[product.id] = response.data.price / 100; // Convert cents to dollars
          } catch (error) {
            console.error(`Error fetching price for product ${product.id}:`, error);
          }
        }
      }
      setPrices(newPrices);
    };

    if (products.length > 0) {
      fetchPrices();
    }
  }, [products]);
  

  return (
    <div className=" p-4 max-w-md mx-auto overflow-hidden min-h-screen flex flex-col">
    <div className="flex justify-between mb-4">
      <button className="text-2xl px-4">☰</button>
      <img src='/icons/profile.jpg' className="w-10 h-10 bg-gray-300 rounded-full"/>
    </div>
    <div className='px-4'>

    <h2 className="text-secondary  mb-1 text-left">Hi Mr. Michael,</h2>
    <h1 className="text-2xl font-bold mb-4 text-left text-darkGray">Welcome Back!</h1>
    
    <h3 className="text-xl font-semibold mb-4 text-left text-darkGray">Our Products</h3>
    </div>

    <div className="grid grid-cols-2 gap-5 p-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="">
              <h2 className="text-lg text-darkGray font-medium mb-2">{product.brand}</h2>
              <img 
                src={product.image} 
                alt={product.brand} 
                className="w-full h-28 object-contain my-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/products/placeholder.jpg';
                }}
              />
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold px-4 text-darkGray"> {prices[product.id] ? `$${prices[product.id].toFixed(2)}` : 'Loading...'}</span>
                <Link 
                  to={`/product/${product.id}-${product.brand.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-12 h-12"
                >
                  <img src='/icons/add.png'
                    className="w-12 h-12"
                    
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductList;