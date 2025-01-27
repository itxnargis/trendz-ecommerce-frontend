import React, { Fragment, useEffect } from "react"
import "./myOrders.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, myOrders } from "../../actions/orderAction"
import Loader from "../layout/Loader/Loader"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import Typography from "@material-ui/core/Typography"
import MetaData from "../layout/metaData"
import LaunchIcon from "@material-ui/icons/Launch"

const MyOrders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, error, orders } = useSelector((state) => state.myOrders)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(myOrders())
  }, [dispatch, alert, error])

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="my-orders-page">
          <div className="my-orders-container">
            <h1 className="my-orders-title">{user.name}'s Orders</h1>
            <table className="my-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Items Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="order-process">
                {orders &&
                  orders.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>
                        <span
                          className={`order-status ${
                            item.orderStatus && item.orderStatus === "Delivered" ? "delivered" : "processing"
                          }`}
                        >
                          {item.orderStatus && item.orderStatus}
                        </span>
                      </td>
                      <td>{item.orderItems.length}</td>
                      <td>₹{item.totalPrice}</td>
                      <td>
                        <Link to={`/order/${item._id}`} className="order-action">
                          <LaunchIcon /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default MyOrders

