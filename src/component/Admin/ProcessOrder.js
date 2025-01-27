import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { Button } from "@material-ui/core"
import MetaData from "../layout/metaData"
import Loader from "../layout/Loader/Loader"
import SideBar from "./Sidebar"
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction"
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant"
import "./processOrder.css"

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { error: updateError, isUpdated } = useSelector((state) => state.order)
  const { id } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully")
      dispatch({ type: UPDATE_ORDER_RESET })
    }
    dispatch(getOrderDetails(id))
  }, [dispatch, alert, error, id, isUpdated, updateError])

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("status", status)
    dispatch(updateOrder(id, myForm))
  }

  return (
    <Fragment>
      <div className="dashboard">
        <MetaData title="Process Order" />
        <SideBar />
        <div className="process-order-container">
          {loading ? (
            <Loader />
          ) : (
            <div className="process-order-content">
              <Typography variant="h4" component="h1" className="process-order-title">
                Process Order #{order._id}
              </Typography>
              <div className="process-order-details">
                <div className="process-order-info">
                  <Typography variant="h6" className="info-title">
                    Shipping Info
                  </Typography>
                  <div className="info-content">
                    <p>
                      <strong>Name:</strong> {order.user && order.user.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNo}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </p>
                  </div>
                </div>
                <div className="process-order-info">
                  <Typography variant="h6" className="info-title">
                    Payment
                  </Typography>
                  <div className="info-content">
                    <p
                      className={
                        order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₹{order.totalPrice && order.totalPrice}
                    </p>
                  </div>
                </div>
                <div className="process-order-info">
                  <Typography variant="h6" className="info-title">
                    Order Status
                  </Typography>
                  <div className="info-content">
                    <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="process-order-items">
                <Typography variant="h6" className="items-title">
                  Order Items
                </Typography>
                <div className="items-container">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product} className="order-item">
                        <img src={item.image || "/placeholder.svg"} alt="Product" />
                        <div className="item-details">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {order.orderStatus !== "Delivered" && (
                <div className="process-order-form-container">
                  <form className="process-order-form" onSubmit={updateOrderSubmitHandler}>
                    <Typography variant="h6">Update Order Status</Typography>
                    <div className="form-group">
                      <AccountTreeIcon />
                      <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Status</option>
                        {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                        {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                      </select>
                    </div>
                    <Button type="submit" disabled={loading || status === ""} className="process-btn">
                      Process
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder

