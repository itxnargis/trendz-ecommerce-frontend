import React from "react";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

const Product = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <div className="image">
            <img src={product.images[0].url} alt={product.name} />
            <div className="details">
            <p>{product.name}</p>
            <div>
                <Rating {...options} />{" "}
                <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
            </div>
            <span>{`Rs${product.price}`}</span>
            </div>
            </div>
        </Link>
    );
};

export default Product;
