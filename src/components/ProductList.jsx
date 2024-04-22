import React from "react";
import '../App.css'
import ProductCard from "./ProductCard";

const ProductList = (props) => {
    const { products } = props

    const listProducts = () => {
        if (products.length > 0){
            return products.map((p) => <ProductCard key={p.id} image={p.images[0]} title={p.title} brand={p.brand} price={p.price} discountedPrice={p.discountedPrice} rating={p.rating} id={p.id}/>)
        } else {
            return "No Products"
        }
    }

return (
    <div className="catalogue">
        {listProducts()}
    </div>
)
    
}

export default ProductList