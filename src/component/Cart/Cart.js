import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const updateQuantity = (id, quantity, stock, increment = true) => {
    const newQty = increment ? quantity + 1 : quantity - 1;
    if ((increment && stock > quantity) || (!increment && quantity > 1)) {
      dispatch(addItemsToCart(id, newQty));
    }
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <RemoveShoppingCartIcon className="empty-cart-icon" />
          <Typography variant="h5">No Products in Your Cart</Typography>
          <Link to="/products" className="view-products-btn">
            View Products
          </Link>
        </div>
      ) : (
        <>
          <Typography variant="h4" className="cart-title cart-heading">
            Your Shopping Cart
          </Typography>
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.product}
                  item={item}
                  deleteCartItems={deleteCartItems}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
            <div className="cart-summary">
              <Typography variant="h6" className="summary-title">
                Order Summary
              </Typography>
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</span>
              </div>
              <div className="summary-item">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</span>
              </div>
              <button className="checkout-btn" onClick={checkoutHandler}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

