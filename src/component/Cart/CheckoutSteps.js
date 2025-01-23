import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core"
import { LocalShipping, LibraryAddCheck, Payment } from "@material-ui/icons"

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient( 95deg, #FF6B6B 0%, #FF8E53 50%, #FFAF7B 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient( 95deg, #FF6B6B 0%, #FF8E53 50%, #FFAF7B 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient( 136deg, #FF6B6B 0%, #FF8E53 50%, #FFAF7B 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage: "linear-gradient( 136deg, #FF6B6B 0%, #FF8E53 50%, #FFAF7B 100%)",
  },
})

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <LocalShipping />,
    2: <LibraryAddCheck />,
    3: <Payment />,
  }

  return (
    <div className={`${classes.root} ${active ? classes.active : ""} ${completed ? classes.completed : ""}`}>
      {icons[String(props.icon)]}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}))

const CheckoutSteps = ({ activeStep }) => {
  const classes = useStyles()
  const steps = ["Shipping Details", "Confirm Order", "Payment"]

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default CheckoutSteps
