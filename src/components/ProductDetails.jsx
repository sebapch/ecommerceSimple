import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        const foundProduct = response.data.find(
          (p) => p.id === parseInt(productId)
        );
        if (foundProduct) {
          const imageUrl = foundProduct.image;
          const extension = imageUrl.substring(imageUrl.lastIndexOf('.') + 1);
          if (extension === 'jpg' || extension === 'jpeg') {
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('.'));
            foundProduct.image = `/icons/${fileName}.png`;
          }
        }
        setProduct(foundProduct);
        if (foundProduct && foundProduct.skus.length > 0) {
          setSelectedSku(foundProduct.skus[0].code);
        }
      } catch (error) {
        window.alert("Error fetching product details");
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchStockPrice = async () => {
      if (selectedSku) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/stock-price/${selectedSku}`
          );
          console.log("Stock price:", response.data);
          setStockPrice(response.data);
        } catch (error) {
          window.alert("Error fetching stock and price information");
        }
      }
    };

    fetchStockPrice();
    const interval = setInterval(fetchStockPrice, 5000);
    return () => clearInterval(interval);
  }, [selectedSku]);

  const handleAddToCart = () => {
    const selectedSkuDetails = product.skus.find(
      (sku) => sku.code === selectedSku
    );
    window.alert(
      `Added to cart: ${product.brand}, Size: ${selectedSkuDetails.name}, Quantity: 1`
    );
  };

  const renderDescription = () => {
    if (!product.information) return "";

    const words = product.information.split(" ");
    const maxWords = 40;

    if (words.length <= maxWords || showFullDescription) {
      return product.information;
    }

    return words.slice(0, maxWords).join(" ") + "...";
  };

  

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-md mx-auto text-left min-h-screen flex ">
      <div className="flex flex-col justify-between">
        <div className="flex items-center mb-4 p-8 ">
        <button 
            className="text-gray-600" 
            onClick={() => navigate('/products')} // Navegar a la ruta /products
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold ml-4">Detail</h1>
          <button className="ml-auto text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center ">
          <img
            src={product.image}
            alt={product.brand}
            className="h-40 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/public/products/placeholder.png";
            }}
          />
        </div>
        <div className="bg-white rounded-t-lg p-8 ">
         
          <div className="mb-4">
            <div className="flex justify-between items-center mt-1">
              <h2 className="text-xl font-semibold ">{product.brand}</h2>
              <p className="text-xl font-bold text-primary">
                ${(stockPrice?.price / 100 || 0).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-secondary ">
              Origin: Import | Stock: {stockPrice?.stock || "N/A"}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <div>
              <p className="text-sm text-secondary">{renderDescription()}</p>
              {product.information.split(" ").length > 40 && (
                <button
                  className="text-primary text-sm mt-1"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.skus.map((sku) => (
                <button
                  key={sku.code}
                  onClick={() => setSelectedSku(sku.code)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedSku === sku.code
                      ? "border border-primary  text-primary"
                      : "border  border-secondary text-secondary"
                  }`}
                >
                  {sku.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 border border-primary rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white p-2 border-1  rounded-lg font-semibold"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
