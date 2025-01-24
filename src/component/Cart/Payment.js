import React, { Fragment, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { createOrder, clearErrors } from "../../actions/orderAction"
import MetaData from "../layout/metaData"
import CheckoutSteps from "./CheckoutSteps"
import { Typography, Button, CircularProgress, Fade, Zoom } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import LockIcon from "@material-ui/icons/Lock"
import "./payment.css"
import { BASE_URL } from "../../url"
import { getAuthToken } from "../../utils/authUtils"

const useStyles = makeStyles((theme) => ({
  paymentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "#f8f9fa",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  paymentForm: {
    width: "100%",
    maxWidth: 500,
    padding: theme.spacing(4),
    backgroundColor: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  paymentTitle: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: 700,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    backgroundColor: "#f0f4f8",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  paymentInput: {
    flex: 1,
    padding: theme.spacing(1.5),
    fontSize: "1rem",
    border: "none",
    backgroundColor: "transparent",
    "&:focus": {
      outline: "none",
    },
  },
  submitButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5),
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    },
  },
  securePayment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    color: theme.palette.success.main,
  },
}))

const Payment = () => {
  const classes = useStyles()
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const dispatch = useDispatch()
  const alert = useAlert()
  const stripe = useStripe()
  const elements = useElements()
  const payBtn = useRef(null)
  const navigate = useNavigate()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)

  const [isProcessing, setIsProcessing] = useState(false)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true
    setIsProcessing(true)

    try {
      const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getAuthToken()}`
            },
          };

      const { data } = await axios.post(`${BASE_URL}api/v1/payment/process`, paymentData, config)

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      })

      if (result.error) {
        payBtn.current.disabled = false
        setIsProcessing(false)
        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          dispatch(createOrder(order))
          navigate("/success")
        } else {
          alert.error("There's some issue while processing payment.")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      setIsProcessing(false)
      alert.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <Fade in={true} timeout={1000}>
        <div className={classes.paymentContainer}>
          <form className={classes.paymentForm} onSubmit={(e) => submitHandler(e)}>
            <Zoom in={true} style={{ transitionDelay: "500ms" }}>
              <Typography variant="h4" className={classes.paymentTitle}>
                Card Payment
              </Typography>
            </Zoom>
            <div className={classes.inputGroup}>
              <CreditCardIcon className={classes.icon} />
              <CardNumberElement className={classes.paymentInput} />
            </div>
            <div className={classes.inputGroup}>
              <EventIcon className={classes.icon} />
              <CardExpiryElement className={classes.paymentInput} />
            </div>
            <div className={classes.inputGroup}>
              <VpnKeyIcon className={classes.icon} />
              <CardCvcElement className={classes.paymentInput} />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isProcessing}
              className={classes.submitButton}
              ref={payBtn}
              fullWidth
            >
              {isProcessing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Pay - ₹${orderInfo && orderInfo.totalPrice}`
              )}
            </Button>

            <div className={classes.securePayment}>
              <LockIcon fontSize="small" style={{ marginRight: 8 }} />
              <Typography variant="body2">Secure Payment</Typography>
            </div>
          </form>
        </div>
      </Fade>
    </Fragment>
  )
}

export default Payment

