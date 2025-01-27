import React, { Fragment, useEffect } from "react"
import "./orderDetails.css"
import { useSelector, useDispatch } from "react-redux"
import MetaData from "../layout/metaData"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { getOrderDetails, clearErrors } from "../../actions/orderAction"
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
import { useParams } from "react-router"

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { id } = useParams()

  const dispatch = useDispatch()
  const alert = useAlert()

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getOrderDetails(id))
  }, [dispatch, alert, error, id])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="order-details-page">
            <div className="order-details-container">
              <h1 className="order-details-title">Order #{order && order._id}</h1>

              <div className="order-details-section">
                <h2 className="order-details-section-title">Shipping Info</h2>
                <div className="order-details-info">
                  <div className="order-details-info-item">
                    <p className="order-details-info-label">Name:</p>
                    <p className="order-details-info-value">{order.user && order.user.name}</p>
                  </div>
                  <div className="order-details-info-item">
                    <p className="order-details-info-label">Phone:</p>
                    <p className="order-details-info-value">{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                  </div>
                  <div className="order-details-info-item">
                    <p className="order-details-info-label">Address:</p>
                    <p className="order-details-info-value">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="order-details-section">
                <h2 className="order-details-section-title">Payment</h2>
                <div className="order-details-info">
                  <div className="order-details-info-item">
                    <p className="order-details-info-label">Status:</p>
                    <p
                      className={`order-details-status ${
                        order.paymentInfo && order.paymentInfo.status === "succeeded" ? "delivered" : "processing"
                      }`}
                    >
                      {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                  </div>
                  <div className="order-details-info-item">
                    <p className="order-details-info-label">Amount:</p>
                    <p className="order-details-info-value">₹{order.totalPrice && order.totalPrice}</p>
                  </div>
                </div>
              </div>

              <div className="order-details-section">
                <h2 className="order-details-section-title">Order Status</h2>
                <p
                  className={`order-details-status ${
                    order.orderStatus && order.orderStatus === "Delivered" ? "delivered" : "processing"
                  }`}
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>

              <div className="order-details-section">
                <h2 className="order-details-section-title">Order Items</h2>
                <div className="order-details-items">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product} className="order-details-item">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt="Product"
                          className="order-details-item-image"
                        />
                        <div className="order-details-item-info">
                          <Link to={`/product/${item.product}`} className="order-details-item-name">
                            {item.name}
                          </Link>
                          <span className="order-details-item-price">
                            {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails

