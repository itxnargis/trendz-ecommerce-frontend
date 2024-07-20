import { React, Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/metaData.js";
import Header from "../layout/Header/Header";
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


          <div class="banner">
            <div class="banner-container">
              <div class="slider-container has-scrollbar">
                <div class="slider-item">
                  <img src={banner} alt="women's latest fashion sale" class="banner-img" />
                  <div class="banner-content">
                    <p class="banner-subtitle">Trending item</p>
                    <h2 class="banner-title">Explore latest fashion sale</h2>
                    <p class="banner-text">
                      FIND AMAZING PRODUCTS BELOW
                    </p>
                    <Link to="/products">
                      <button>
                        SHOP NOW
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>

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
