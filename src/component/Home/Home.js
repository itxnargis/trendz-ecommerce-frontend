import { React, Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/metaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
import banner from "../../images/banner.jpg";
import { Link } from "react-router-dom";

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
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

          <div className="banner">
            <div className="banner-container">
              <div className="slider-container has-scrollbar">
                <div className="slider-item">
                  <img src={banner} alt="women's latest fashion sale" className="banner-img" />
                  <div className="banner-content">
                    <p className="banner-subtitle">Trending item</p>
                    <h2 className="banner-title">Explore latest fashion sale</h2>
                    <p className="banner-text">
                      FIND AMAZING PRODUCTS BELOW
                    </p>
                    <Link to="/products">
                      <button className="shop-button">
                        SHOP NOW ➔
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="featured-product-section">
            <h2 className="home-heading">Featured Products</h2>

            <div className="container" id="container">
              {products && products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
