import React from "react";
import "../App.css";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../redux/actions";

const ProductCard = (props) => {
    const { images, brand, title, price, discountedPrice, rating, id } = props.product;
    const dispatch = useDispatch();
    
    const handleProductClick = () => {
        dispatch(setActiveProduct(props.product))
    }

    return (
        <>
            <a className="product-card" href="#" onClick={()=>handleProductClick()}>
                <img className="product-card__image" src={images[0]} />
                <Rater data-tooltip-id={id} total={5} rating={rating} interactive={false} />
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
            <ReactTooltip
                id={id}
                place="bottom"
                content={"Rating " + rating}
            />
        </>
    );
};

export default ProductCard;