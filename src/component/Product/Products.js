import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product.js";
import Pagination from "react-js-pagination";
import { useParams, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    const searchParams = new URLSearchParams(location.search);
    const price = [
      Number(searchParams.get('price[gte]') || 0),
      Number(searchParams.get('price[lte]') || 25000)
    ];
    const category = searchParams.get('category') || '';
    const ratings = Number(searchParams.get('ratings') || 0);

    dispatch(getProduct(keyword, currentPage, price, category, ratings));

    if (!searchParams.has('price[gte]') && !searchParams.has('category') && !searchParams.has('ratings')) {
      navigate('/');
    }

  }, [dispatch, keyword, currentPage, location.search, alert, error, navigate]);


  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS --- ECOMMERCE" />
          <div className="product-section">
            <h2 className="products-heading">Products</h2>
            <div className="underline"></div>
            <div className="products" id="product">
              {products && products.map((product) => (
                <Product key={product._id} product={product} />
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;