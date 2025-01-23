import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { Country, State } from "country-state-city"
import { saveShippingInfo } from "../../actions/cartAction"
import MetaData from "../layout/metaData"
import CheckoutSteps from "./CheckoutSteps"
import { Typography, TextField, Button, Grid, Container, Paper, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Home, LocationCity, PinDrop, Phone, Public, TransferWithinAStation } from "@material-ui/icons"
import { motion } from "framer-motion"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  title: {
    marginBottom: theme.spacing(3),
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
}))

const Shipping = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingInfo?.address || "")
  const [city, setCity] = useState(shippingInfo?.city || "")
  const [state, setState] = useState(shippingInfo?.state || "")
  const [country, setCountry] = useState(shippingInfo?.country || "")
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "")
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "")

  const shippingSubmit = (e) => {
    e.preventDefault()

    if (phoneNo.length !== 10) {
      alert.error("Phone number should be 10 digits long")
      return
    }
    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
    navigate("/order/confirm")
  }

  return (
    <>
      <MetaData title="Shipping Details" />
      <motion.div
        className={classes.root}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="md">
          <CheckoutSteps activeStep={0} />
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary" className={classes.title}>
              Shipping Details
            </Typography>
            <form className={classes.form} onSubmit={shippingSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                  className={classes.title}
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Home />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  className={classes.title}
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <LocationCity />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  className={classes.title}
                    fullWidth
                    label="Pin Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                    type="number"
                    InputProps={{
                      startAdornment: <PinDrop />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  className={classes.title}
                    fullWidth
                    label="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    type="number"
                    InputProps={{
                      startAdornment: <Phone />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  className={classes.title}
                    select
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Public />,
                    }}
                  >
                    {Country.getAllCountries().map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {country && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <TransferWithinAStation />,
                      }}
                    >
                      {State.getStatesOfCountry(country).map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!state}
              >
                Continue
              </Button>
            </form>
          </Paper>
        </Container>
      </motion.div>
    </>
  )
}

export default Shipping

