import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product.js";
import Pagination from "react-js-pagination";
import { useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/metaData";
import { FaFilter, FaSignInAlt } from "react-icons/fa";
import Modal from '@material-ui/core/Modal';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Jewellery",
    "Watches",
    "Camera",
    "SmartPhones",
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [open, setOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 600);

    const [appliedFilters, setAppliedFilters] = useState({
        price: [0, 25000],
        category: "",
        ratings: 0,
    });

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
        if (isLargeScreen) {
            applyFilters(newPrice, category, ratings);
        }
    };

    const categoryHandler = (category) => {
        setCategory(category);
        if (isLargeScreen) {
            applyFilters(price, category, ratings);
        }
    };

    const ratingsHandler = (event, newRating) => {
        setRatings(newRating);
        if (isLargeScreen) {
            applyFilters(price, category, newRating);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const applyFilters = (price, category, ratings) => {
        setAppliedFilters({ price, category, ratings });
        setCurrentPage(1);
        dispatch(getProduct(keyword, 1, price, category, ratings));
        if (!isLargeScreen) {
            handleClose();
        }
    };

    const clearFilters = () => {
        setPrice([0, 25000]);
        setCategory("");
        setRatings(0);
        setAppliedFilters({ price: [0, 25000], category: "", ratings: 0 });
        setCurrentPage(1);
        dispatch(getProduct(keyword, 1, [0, 25000], "", 0));
        handleClose();
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, appliedFilters.price, appliedFilters.category, appliedFilters.ratings));
    }, [dispatch, keyword, currentPage, appliedFilters, alert, error]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 600);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let count = filteredProductsCount;

    const filterContent = (
        <div className="filterContent">
            <Typography className="customFontSize">Price</Typography>
            <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
            />
            <Typography className="customFontSize">Categories</Typography>
            <ul className="categoryBox">
                {categories.map((category) => (
                    <li
                        className="category-link"
                        key={category}
                        onClick={() => categoryHandler(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
            <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                    value={ratings}
                    onChange={ratingsHandler}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </fieldset>
            <div className="filterButtons">
                <button onClick={() => applyFilters(price, category, ratings)} className="applyButton">Done</button>
                <button onClick={clearFilters} className="cancelButton">Clear Filters</button>
            </div>
        </div>
    );

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS --- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="underline"></div>
                    <div className="iconsContainer">
                        <div className="filterIcon" onClick={handleOpen}>
                            <FaFilter size={15} />
                            <p>Filters</p>
                        </div>
                        <Link to="/login" className="loginIcon">
                            <FaSignInAlt size={15} />
                            <p>Login</p>
                        </Link>
                    </div>
                    <div className="underline"></div>
                    <div className="products" id="product">
                        {products && products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography className="customFontSize">Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography className="customFontSize">Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => categoryHandler(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={ratingsHandler}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className="PaginationBox">
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
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {filterContent}
                    </Modal>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
