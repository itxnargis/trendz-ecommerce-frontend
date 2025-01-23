import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Typography, Button, Container, Grid, Paper, Box } from "@material-ui/core"
import { RemoveShoppingCart, ShoppingCart } from "@material-ui/icons"
import { motion } from "framer-motion"
import CartItemCard from "./CartItemCard"
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction"
import "./Cart.css"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.user)

  const updateQuantity = (id, quantity, stock, increment = true) => {
    const newQty = increment ? quantity + 1 : quantity - 1
    if ((increment && stock > quantity) || (!increment && quantity > 1)) {
      dispatch(addItemsToCart(id, newQty))
    }
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id))
  }

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping")
    } else {
      navigate("/login?redirect=shipping")
    }
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const shippingCharges = subtotal > 1000 ? 0 : 200
  const tax = subtotal * 0.18
  const totalPrice = subtotal + shippingCharges + tax

  if (cartItems.length === 0) {
    return (
      <Container className="cartPage">
        <motion.div
          className="emptyCart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RemoveShoppingCart className="emptyCartIcon" />
          <Typography variant="h5" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="primary"
            className="viewProductsBtn"
            startIcon={<ShoppingCart />}
          >
            View Products
          </Button>
        </motion.div>
      </Container>
    )
  }

  return (
    <Container className="cartPage">
      <Typography variant="h4" color="primary" className="cartTitle">
        Your Shopping Cart
      </Typography>
      <Grid container spacing={4} className="cartContainer">
        <Grid item xs={12} md={8}>
          <motion.div className="cartItems" layout>
            {cartItems.map((item) => (
              <motion.div
                key={item.product}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CartItemCard item={item} deleteCartItems={deleteCartItems} updateQuantity={updateQuantity} />
              </motion.div>
            ))}
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="cartSummary">
            <Typography variant="h6" className="summaryTitle">
              Order Summary
            </Typography>
            <Box className="summaryItem">
              <Typography>Subtotal:</Typography>
              <Typography>₹{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box className="summaryItem">
              <Typography>Shipping:</Typography>
              <Typography>₹{shippingCharges.toFixed(2)}</Typography>
            </Box>
            <Box className="summaryItem">
              <Typography>Tax:</Typography>
              <Typography>₹{tax.toFixed(2)}</Typography>
            </Box>
            <Box className="summaryItem total">
              <Typography>Total:</Typography>
              <Typography>₹{totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="checkoutBtn"
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart