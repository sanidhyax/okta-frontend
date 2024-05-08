import React from "react";
import '../App.css';
import ImageGallery from "react-image-gallery";
import { Button } from "@mui/material";
import Rater from "react-rater";

const SingleProduct = (props) => {
    const { product, handleProductClose } = props;

    const mapImagesForGallary = (images) => {
    return images.map(imageUrl => ({
        original: imageUrl,
        thumbnail: imageUrl,
    }));
    }

    console.log(product)

    if (product === 0) {
        return (
            <section className="description" id={"single-product-section"}>
            <hr id="scrollToHere" style={{ width: 100 + 'vw' }} />
            <p className="main-tag" style={{color:'red'}}>Error in fetching product</p>
            <div className="close-button"> <Button variant="contained" onClick={() => handleProductClose()}>Close</Button></div>
            <hr style={{ width: 100 + 'vw' }} />
            </section>
        )
    } else {
    return (
        
        <section className="description" id={"single-product-section"}>
            <hr id="scrollToHere" style={{ width: 100 + 'vw' }} />

            <div className="image-gallery-div">
                <ImageGallery items={mapImagesForGallary(product.images)} thumbnailHeight="100px" />
            </div>
            <div className="single-product-details-div">
                <Rater total={5} rating={product.rating} interactive={false} /> <p>Rating {product.rating}/5</p>
                <p className="pre">{product.brand}</p>
                <h1>{product.title}</h1>
                <p className="desc">
                    {product.description}
                </p>
                <div className="price">
                    <div className="main-tag">
                        <s>${product.price}</s>
                        <p> ${parseFloat(product.price - (product.discountPercentage / 100) * product.price).toFixed(2)}</p>
                        <p style={{color:'red'}}>-{product.discountPercentage}%</p>
                    </div>
                </div>
            </div>
            <div className="close-button"> <Button variant="contained" onClick={() => handleProductClose()}>Close</Button></div>
            <hr style={{ width: 100 + 'vw' }} />
        </section>
    );
    }
};

export default SingleProduct;
