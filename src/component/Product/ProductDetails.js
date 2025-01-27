import React, { useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction"
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
import MetaData from "../layout/metaData"
import { useParams } from "react-router"
import { addItemsToCart } from "../../actions/cartAction"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../../constants/productConstant"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { id } = useParams()

    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const increaseQuantity = () => {
        if (product.stock <= quantity) return
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return
        setQuantity(quantity - 1)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        alert.success("Item added to cart")
    }

    const submitReviewToggle = () => {
        setOpen(!open)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", id)

        dispatch(newReview(myForm))
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success])

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product.name} --- ECOMMERCE`} />
                        <div className="products-details">
                            <div className="products-image-carousel">
                                <div>
                                    <Carousel>
                                        {product.images &&
                                            product.images.map((item, index) => (
                                                <img
                                                    className="carousel-image"
                                                    key={item.url}
                                                    src={item.url}
                                                    alt={`${index} Slide`}
                                                />
                                            ))}
                                    </Carousel>
                                </div>
                            </div>

                            <div className="products-info">
                                <h1 className="products-title">{product.name}</h1>
                                <p className="products-id">Product # {product._id}</p>

                                <div className="products-rating">
                                    <Rating {...options} />
                                    <span>({product.numOfReviews} Reviews)</span>
                                </div>

                                <h2 className="products-price">{`Rs ${product.price}`}</h2>

                                <div className="product-actions">
                                    <div className="quantity-selector">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button className="add-to-cart" disabled={product.Stock < 1} onClick={addToCartHandler}>
                                        Add to cart
                                    </button>
                                </div>

                                <p className="product-status">
                                    Status:{" "}
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                                    </b>
                                </p>

                                <div className="products-description">
                                    <h3>Description:</h3>
                                    <p>{product.description}</p>
                                </div>

                                <button onClick={submitReviewToggle} className="submit-reviews">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                    <div className="reviews-section">
                        <h2 className="reviews-heading">REVIEWS</h2>

                        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submit-dialog">
                                <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                                <textarea
                                    className="submit-dialog-text-area"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {product.reviews && product.reviews.length > 0 ? (
                            <div className="reviews">
                                {product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className="no-reviews">No Reviews Yet</p>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails

