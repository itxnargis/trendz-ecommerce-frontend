import { React, Fragment, useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/metaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import banner from "../../assets/banner.jpg";
import ProductCardSkeleton from "./ProductCaedSkeleton.js";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [showingSkeleton, setShowingSkeleton] = useState(true);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());    
    }
    dispatch(getProduct());  
  }, [dispatch, error, alert]);

  // Progressive loading effect
  useEffect(() => {
    if (products && products.length > 0) {
      setShowingSkeleton(false);
      
      // Show products progressively
      const showProductsProgressively = () => {
        // Show first 2 products immediately
        setTimeout(() => {
          setVisibleProducts(products.slice(0, 2));
        }, 100);

        // Show next 2 products
        setTimeout(() => {
          setVisibleProducts(products.slice(0, 4));
        }, 300);

        // Show all 6 products
        setTimeout(() => {
          setVisibleProducts(products.slice(0, 6));
        }, 500);
      };

      showProductsProgressively();
    }
  }, [products]);

  return (
    <Fragment>
      <MetaData title="ECOMMERCE" />
      {loading ? (
        <Loader />      
      ) : (
        <Fragment>
          {/* Banner Section - Loads immediately */}
          <div className="banner">
            <div className="banner-container">
              <div className="slider-container has-scrollbar">
                <div className="slider-item">
                  <img
                    src={banner || "/placeholder.svg"}
                    alt="women's latest fashion sale"
                    className="banner-img"
                    loading="eager"
                    width="1000"
                    height="700"
                  />
                  <div className="banner-content animate-slide-in">
                    <p className="banner-subtitle">Trending item</p>
                    <h2 className="banner-title">Explore latest fashion sale</h2>
                    <p className="banner-text">FIND AMAZING PRODUCTS BELOW</p>
                    <Link to="/products">
                      <button className="shop-button">SHOP NOW ➔</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Product Section */}
          <div className="featured-product-section">
            <Typography variant="h4" color="#000" className="features-title animate-fade-in">              
              Featured Products
            </Typography>
            <div className="container" id="container">
              {/* Show visible products with staggered animation */}
              {visibleProducts.map((product, index) => (
                <div 
                  key={product._id} 
                  className="product-wrapper"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: `slideInUp 0.6s ease-out ${index * 100}ms forwards`
                  }}
                >
                  <LazyLoad height={300} offset={100} once>
                    <ProductCard product={product} />
                  </LazyLoad>
                </div>
              ))}

              {/* Show skeletons for remaining products */}
              {showingSkeleton && (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </>
              )}

              {/* Show skeletons for products not yet visible */}
              {!showingSkeleton && visibleProducts.length < 6 && products.length >= 6 && (
                <>
                  {Array.from({ length: 6 - visibleProducts.length }).map((_, index) => (
                    <ProductCardSkeleton key={`loading-${index}`} />
                  ))}
                </>
              )}
            </div>
          </div>
        </Fragment>      
      )}
    </Fragment>  
  );
};

export default Home;
