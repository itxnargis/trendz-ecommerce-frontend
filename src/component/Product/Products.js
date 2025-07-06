import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import LazyLoad from "react-lazyload";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      <MetaData title="PRODUCTS --- ECOMMERCE" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="product-section">
            {products && products.length > 0 ? (
              <>
                <Typography variant="h4" color="#000" className="product-title">
                  Products
                </Typography>

                <div className="products" id="product">
                  {products.map((product) => (
                    <LazyLoad height={300} offset={100} once key={product._id}>
                      <ProductCard product={product} />
                    </LazyLoad>
                  ))}
                </div>

                {resultPerPage < count && (
                  <div className="pagination-box">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={filteredProductsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="page-item-active"
                      activeLinkClass="page-link-active"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="empty-cart">
                <RemoveShoppingCartIcon className="empty-cart-icon" />
                <h2 className="empty-product">No products available</h2>
                <Link to="/products" className="view-products-btn">
                  View All Products
                </Link>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
