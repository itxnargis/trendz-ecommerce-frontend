import React from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Typography, Button, Grid, Paper, List, ListItem, ListItemText, Divider, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { motion } from "framer-motion"
import CheckoutSteps from "./CheckoutSteps"
import MetaData from "../layout/metaData"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
    marginRight: theme.spacing(2),
  },
  orderSummary: {
    position: "sticky",
    top: theme.spacing(2),
  },
}))

const ConfirmOrder = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const shippingCharges = subtotal > 1000 ? 0 : 200
  const tax = subtotal * 0.18
  const totalPrice = subtotal + shippingCharges + tax

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment")
  }

  return (
    <>
      <MetaData title="Confirm Order" />
      <motion.div
        className={classes.root}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckoutSteps activeStep={1} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="primary" gutterBottom className={classes.title}>
                Shipping Address
              </Typography>
              <Typography gutterBottom>{user.name}</Typography>
              <Typography gutterBottom>{address}</Typography>
              <Typography gutterBottom>{shippingInfo.phoneNo}</Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="primary" gutterBottom className={classes.title}>
                Your Cart Items
              </Typography>
              <List disablePadding>
                {cartItems.map((item) => (
                  <React.Fragment key={item.product}>
                    <ListItem className={classes.listItem}>
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className={classes.image} />
                      <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                      <Typography variant="body2">₹{item.price * item.quantity}</Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={`${classes.paper} ${classes.orderSummary}`}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Order Summary
              </Typography>
              <List disablePadding>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="subtitle1">₹{subtotal.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Shipping" />
                  <Typography variant="subtitle1">₹{shippingCharges.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Tax" />
                  <Typography variant="subtitle1">₹{tax.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    ₹{totalPrice.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
              <Box mt={3}>
                <Button variant="contained" color="primary" fullWidth onClick={proceedToPayment}>
                  Proceed to Payment
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </>
  )
}

export default ConfirmOrder

