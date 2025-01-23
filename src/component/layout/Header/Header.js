import React, { useState } from 'react';
import Search from '../../Product/Search.js';
import { FaBars, FaTimes, FaChevronCircleDown, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FilterModal from '../../Product/FilterModal';
import logo from "../../../images/Trendz-logo.png"
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className='header'>
        <div className='header-component'>
          <img src={logo} alt="Trendz logo" className="logo-img" />
          <div className='links'>
            <Link to="/" className="link-details">Home</Link>
            <Link to="/products" className="link-details">Products</Link>
            <Link to="/about" className="link-details">About</Link>
            <Link to="/contact" className="link-details">Contact</Link>
          </div>
          <div className="social">
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
            </Link>
            <Link to="/login" className="login-icon">
              <FaUser />
            </Link>
            <Link to="#" className="bar-icon" onClick={toggleSidebar}>
              <FaBars />
            </Link>
          </div>
        </div>
      </div>
      <div className={`side-bar ${isOpen ? 'open' : ''}`}>
        <div className='side-bar-content'>
          <Link to="#" className="close-icon" onClick={toggleSidebar}><FaTimes /></Link>
          <div className='side-bar-links'>
            <Link to="/" className="side-bar-link" onClick={closeSidebar}>Home</Link>
            <Link to="/products" className="side-bar-link" onClick={closeSidebar}>Products</Link>
            <Link to="/about" className="side-bar-link" onClick={closeSidebar}>About</Link>
            <Link to="/contact" className="side-bar-link" onClick={closeSidebar}>Contact</Link>
          </div>
        </div>
      </div>

      <div className='header-bottom'>
        <div className='header-bottom-box'>
          <button className="sort-btn" onClick={handleOpenModal}>
            Sort By <FaChevronCircleDown />
          </button>
          <div className='search'>
            <Search />
          </div>
        </div>
      </div>

      <FilterModal open={openModal} handleClose={handleCloseModal} />
    </header>
  );
};

export default Header;

