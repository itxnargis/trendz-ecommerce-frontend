import React from 'react';
import Search from "../../Product/Search.js";
import { FaBars, FaSearch, FaHeart, FaShoppingCart, FaAdn } from 'react-icons/fa';
import './Header.css';
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { FaFilter, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className='header'>
      <div className='header-component'>
        <Link to="#" className="bar-logo"><FaBars /></Link>
        <div className='links'>
        <Link to="/" className="link-details">Home</Link>
        <Link to="/products" className="link-details">Projects</Link>
        <Link to="/about" className="link-details">About</Link>
        <Link to="/contact" className="link-details">Contact</Link>
        </div>
        <div className="social">
        <Link to="/login" className="login-icon">
          <FaUser />
        </Link>
        <Link to="/cart" className="cart-icon">
         <FaShoppingCart />
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
