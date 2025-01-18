import React from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/metaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, Divider } from "@material-ui/core";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <div className="confirm-order-details">
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-page">
        <div className="confirm-order-container">
          <div className="confirm-shipping-area">
            <Typography variant="h6">Shipping Info</Typography>
            <div className="confirm-shipping-box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <Divider className="divider" />
          <div className="confirm-cart-items">
            <Typography variant="h6">Your Cart Items:</Typography>
            <div className="confirm-cart-items-container">
              {cartItems.map((item) => (
                <div key={item.product} className="confirm-cart-item">
                  <img src={item.image || "/placeholder.svg"} alt="Product" />
                  <div className="item-details">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x ₹{item.price} =
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-summary">
          <Typography variant="h6">Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="order-summary-total">
            <p>
              <b>Total:</b>
            </p>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={proceedToPayment}
            className="proceed-btn"
          >
            Proceed To Payment
          </Button>
        </div>
      </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
