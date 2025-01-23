import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, IconButton, Box } from "@material-ui/core"
import { Add, Remove, Delete } from "@material-ui/icons"
import { motion } from "framer-motion"

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: 200,
    },
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemName: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  price: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  quantity: {
    margin: theme.spacing(0, 2),
  },
  removeBtn: {
    marginTop: theme.spacing(1),
  },
}))

const CartItemCard = ({ item, deleteCartItems, updateQuantity }) => {
  const classes = useStyles()

  return (
    <motion.div layout>
      <Card className={classes.card}>
        <img src={item.image || "/placeholder.svg"} alt={item.name} className={classes.image} />
        <CardContent className={classes.content}>
          <Box>
            <Typography variant="h6" component={Link} to={`/product/${item.product}`} className={classes.itemName}>
              {item.name}
            </Typography>
            <Typography variant="h6" className={classes.price}>
              ₹{item.price}
            </Typography>
          </Box>
          <Box>
            <Box className={classes.quantityControl}>
              <IconButton onClick={() => updateQuantity(item.product, item.quantity, item.stock, false)} size="small">
                <Remove />
              </IconButton>
              <Typography variant="body1" className={classes.quantity}>
                {item.quantity}
              </Typography>
              <IconButton onClick={() => updateQuantity(item.product, item.quantity, item.stock)} size="small">
                <Add />
              </IconButton>
            </Box>
            <IconButton onClick={() => deleteCartItems(item.product)} color="secondary" className={classes.removeBtn}>
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default CartItemCard

