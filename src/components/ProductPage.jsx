import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProductPage = () => {

    const productOpen = useSelector(state => state.productOpen)

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    if (e.target.value === 'S') {
      setSelectedPrice(10);
    } else if (e.target.value === 'M') {
      setSelectedPrice(15);
    } else if (e.target.value === 'L') {
      setSelectedPrice(20);
    }
  }

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src="image1.jpg" alt="Product Image" />
        <img src="image2.jpg" alt="Product Image" />
      </div>
      <div className="product-details">
        <h1>Product Name</h1>
        <p>Price: ${selectedPrice}</p>
        <label htmlFor="size-select">Size:</label>
        <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;