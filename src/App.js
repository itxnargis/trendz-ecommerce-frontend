import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import './App.css';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/NotFound/NotFound.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "./url.js";
import { getAuthToken } from "./utils/authUtils.js";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  
  async function getStripeApiKey() {
    try {
      const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getAuthToken()}`
            },
          };
  
      const { data } = await axios.get(`${BASE_URL}/api/v1/stripeapikey`, config);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API Key:", error.response?.data || error.message);
    }
  }
  
  useEffect(() => {
    // getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Provider store={store}>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<ProtectedRoute component={Profile} />} />
          <Route path="/me/update" element={<ProtectedRoute component={UpdateProfile} />} />
          <Route path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ProtectedRoute component={Shipping} />} />
          <Route path="/process/payment" element={
    stripeApiKey ? (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute component={Payment} />
      </Elements>
    ) : (
      <NotFound />
    )
  }
/>
          <Route path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
          <Route path="/orders" element={<ProtectedRoute component={MyOrders} />} />
          <Route path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
          <Route path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={Dashboard} />} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
          <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} component={NewProduct} />} />
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} component={OrderList} />} />
          <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} component={UsersList} />} />
          <Route path="/admin/users/:id" element={<ProtectedRoute isAdmin={true} component={UpdateUser} />} />
          <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} component={ProductReviews} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;