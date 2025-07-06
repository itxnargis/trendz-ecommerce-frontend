"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "@material-ui/lab/Rating"
import { useDispatch } from "react-redux"
import { addItemsToCart } from "../../actions/cartAction"
import { FaShoppingCart } from "react-icons/fa"
import { useAlert } from "react-alert"
import "./Product.css"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const addToCartHandler = async () => {
    setIsAddingToCart(true)

    // Add a small delay for better UX
    setTimeout(() => {
      dispatch(addItemsToCart(product._id, 1))
      alert.success("Product added to cart")
      setIsAddingToCart(false)
    }, 500)
  }

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="product-card-container">
      <Link className="product-card" to={`/product/${product._id}`}>
        <div className="image-wrapper">
          {!imageLoaded && <div className="image-placeholder"></div>}
          <img
            src={product.images[0].url || "/placeholder.svg"}
            alt={product.name}
            loading="lazy"
            width="300"
            height="300"
            className={`product-img ${imageLoaded ? "loaded" : "loading"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
        <div className="product-description">
          <p className="product-brand">{product.brand}</p>
          <p className="product-name">{product.name}</p>
          <div className="product-rating">
            <Rating {...options} />
            <span className="product-card-span">({product.numOfReviews} Reviews)</span>
          </div>
          <span className="product-price">{`Rs ${product.price}`}</span>
        </div>

          <button
        onClick={addToCartHandler}
        className={`cart-button ${isAddingToCart ? "loading" : ""}`}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <>
            <div className="loading-spinner"></div>
            Adding...
          </>
        ) : (
          <>
            <FaShoppingCart />
            Add to cart
          </>
        )}
      </button>
      </Link>
    
    </div>
  )
}

export default ProductCard
