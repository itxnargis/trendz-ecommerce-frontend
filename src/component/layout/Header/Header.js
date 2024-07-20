import React, { useState } from 'react';
import Search from '../../Product/Search.js';
import { FaBars, FaChevronCircleDown, FaSearch, FaHeart, FaShoppingCart, FaAdn, FaTimes } from 'react-icons/fa';
import './Header.css';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaFilter, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className='header'>
        <div className='header-component'>
          <Link to="#" className="bar-logo" onClick={toggleSidebar}><FaBars /></Link>
          <div className='links'>
            {/* These links will be hidden on small screens */}
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

      {/* Sidebar for small devices */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='sidebar-content'>
          <Link to="#" className="close-icon" onClick={toggleSidebar}><FaTimes /></Link>
          <div className='sidebar-links'>
            <Link to="/" className="sidebar-link">Home</Link>
            <Link to="/products" className="sidebar-link">Projects</Link>
            <Link to="/about" className="sidebar-link">About</Link>
            <Link to="/contact" className="sidebar-link">Contact</Link>
          </div>
        </div>
      </div>

      <div className='header-bottom'>
        <div className='header-bottom-box'>
          <Link to="/filter" className="filter-logo">Sort By<FaChevronCircleDown /></Link>
          <div className='search'>
            <Search />
          </div>
          <div className="">
            <Link to="/login" className="login-icon">
              <FaUser />
            </Link>
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
