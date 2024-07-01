import { React, Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlineShopping } from 'react-icons/ai';


import "./Home.css";

import Product from "./Product.js";
import MetaData from "../layout/metaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
import girl from "../../images/girl.webp";


const Home = () => {

    const [currency, setCurrency] = useState('usd');
  const [language, setLanguage] = useState('en-US');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="ECOMMERCE" />

                    <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <li>
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <FaLinkedinIn />
              </a>
            </li>
          </ul>

          <div className="header-alert-news">
            <p>
              <b>Free Shipping</b>
              This Week Order Over - $55
            </p>
          </div>

          <div className="header-top-actions">
            <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="usd">USD &dollar;</option>
              <option value="eur">EUR &euro;</option>
            </select>

            <select name="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <a href="#" className="header-logo">
            <img src={girl} alt="Anon's logo" width="120" height="36" />
          </a>

          <div className="header-search-container">
            <input type="search" name="search" className="search-field" placeholder="Enter your product name..." />
            <button className="search-btn">
              <AiOutlineSearch />
            </button>
          </div>

          <div className="header-user-actions">
            <button className="action-btn">
              <AiOutlineUser />
            </button>
            <button className="action-btn">
              <AiOutlineHeart />
              <span className="count">{wishlistCount}</span>
            </button>
            <button className="action-btn">
              <AiOutlineShopping />
              <span className="count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>


      <div class="banner">

<div class="container">

  <div class="slider-container has-scrollbar">

    <div class="slider-item">

      <img src={girl} alt="women's latest fashion sale" class="banner-img"/>

      <div class="banner-content">

        <p class="banner-subtitle">Trending item</p>

        <h2 class="banner-title">Women's latest fashion sale</h2>

        <p class="banner-text">
          starting at &dollar; <b>20</b>.00
        </p>

        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

    <div class="slider-item">

    <img src={girl} alt="summer sale" className="banner-img" />
      <div class="banner-content">

        <p class="banner-subtitle">Trending accessories</p>

        <h2 class="banner-title">Modern sunglasses</h2>

        <p class="banner-text">
          starting at &dollar; <b>15</b>.00
        </p>

        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

    <div class="slider-item">

      <img src={girl} alt="new fashion summer sale" className="banner-img" />

      <div class="banner-content">

        <p class="banner-subtitle">Sale Offer</p>

        <h2 class="banner-title">New fashion summer sale</h2>

        <p class="banner-text">
          starting at &dollar; <b>29</b>.99
        </p>

        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

  </div>

</div>

</div>


                {/* <div class="row">
                    <div class="main">
                        <h1>Stylish & Dashing</h1>
                        <p>Produce and supply various handicraft item all over the world which worth more attractive.
                        </p>
                        <button>Shop Now</button>
                    </div>
                    <div class="col">
                    <img src={girl} alt="playstore" />
                    </div>

                </div> */}


                    {/* <div className="banner">
                        <p>Welcome to Trendz</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div> */}

                    <h2 className="home-heading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
