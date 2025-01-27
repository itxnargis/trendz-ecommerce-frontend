import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Paper } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { motion } from "framer-motion";
import "./orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-details">
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={4} className="order-success">
            <div className="root">
              <CheckCircle className="icon" />
              <Typography variant="h4" className="title">
                Order Placed Successfully!
              </Typography>
              <Typography variant="body1" className="message" gutterBottom>
                Thank you for your purchase! We’re preparing your order now.
              </Typography>
              <Button
                component={Link}
                to="/orders"
                variant="contained"
                color="primary"
                className="button"
              >
                View My Orders
              </Button>
            </div>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};


export default OrderSuccess
