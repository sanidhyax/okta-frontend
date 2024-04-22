import React from "react";
import "../App.css";

const ProductCard = (props) => {
    const { image, brand, title, price, discountedPrice } = props;

    return (
        <a className="product-card" href="#dolce-gabbana-cropped">
            <img className="product-card__image" src={image} />
            <div id="product-card-details">
                <div className="product-card-name-div">
                    <p className="product-card__brand">{brand}</p>
                    <p className="product-card__title">{title}</p>
                </div>
                <div className="product-card-price-div">
                    <p id="product-card__fullprice">$<s>{price}</s></p>
                    <p id="product-card__price">${discountedPrice}</p>
                </div>
            </div>
        </a>
    );
};

export default ProductCard;