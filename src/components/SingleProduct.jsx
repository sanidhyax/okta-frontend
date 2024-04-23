import React from "react";
import '../App.css';

const SingleProduct = (props) => {
    const {product} = props;
  
    return (
    <section className="description">
      <p className="pre">{product.brand}</p>
      <h1>{product.title}</h1>
      <p className="desc">
        {product.description}
      </p>
      <div className="price">
      <s>${product.price}</s>
        <div className="main-tag">
          <p>${product.discountedPrice}</p>
          <p>{product.discountPercentage}%</p>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;