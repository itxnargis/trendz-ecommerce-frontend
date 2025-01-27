import { React, Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import { Typography } from "@material-ui/core"
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/metaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from 'react-alert';
import banner from "../../assets/banner.jpg"
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
                <img src={banner} alt="women's latest fashion sale" className="banner-img" loading="lazy" />
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
          <Typography variant="h4" color="#000" className="features-title">
        Featured Products
      </Typography>
            <div className="container" id="container">
            {products && products.slice(0, 6).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;