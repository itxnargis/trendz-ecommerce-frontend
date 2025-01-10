import React from "react";
import "./CartItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems, updateQuantity }) => {
  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <Link to={`/product/${item.product}`} className="item-name">
          {item.name}
        </Link>
        <span className="item-price">{`₹${item.price}`}</span>
        <div className="quantity-control">
          <button
            onClick={() =>
              updateQuantity(item.product, item.quantity, item.stock, false)
            }
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            onClick={() =>
              updateQuantity(item.product, item.quantity, item.stock)
            }
            className="quantity-btn"
          >
            +
          </button>
        </div>
        <button
          onClick={() => deleteCartItems(item.product)}
          className="remove-btn"
        >
         <DeleteIcon className="input-delete"  /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;

