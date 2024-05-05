import React from "react";
import "../App.css";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { setActiveProduct, setPageLoading } from "../redux/actions";
import { fetchSingleProduct } from "./AxiosService";
import { baseUrlForSingleProduct } from "./ProductCatalogue";

const ProductCard = (props) => {
    const { images, brand, title, price, discountedPrice, rating, id } = props.product;
    const dispatch = useDispatch();

    const handleProductClick = async (productId) => {
        dispatch(setPageLoading(true))
        const activeProd = await fetchSingleProduct(baseUrlForSingleProduct, id)
        console.log(activeProd)
        dispatch(setActiveProduct(activeProd))
        dispatch(setPageLoading(false))
        window.scrollTo({
            top: 155,
            behavior: 'smooth'
          });
    }

    return (
        <>
            <div className="product-card" href="#" onClick={() => handleProductClick()}>
                <div className="product-card-image-div">
                <img className="product-card__image" src={images[0]} />
                </div>
                <div className="product-card-rater">
                    <Rater data-tooltip-id={id} total={5} rating={rating} interactive={false} />
                    </div>
                    <div className="product-card-details">
                    <div className="product-card-name-div">
                        <p className="product-card__brand">{brand}</p>
                        <p className="product-card__title">{title}</p>
                    </div>
                    <div className="product-card-price-div">
                        <p className="product-card__fullprice">$<s>{price}</s></p>
                        <p className="product-card__price">${discountedPrice}</p>
                    </div>
                </div>
            </div>
            <ReactTooltip
                id={id}
                place="bottom"
                content={"Rating " + rating}
            />
        </>
    );
};

export default ProductCard;