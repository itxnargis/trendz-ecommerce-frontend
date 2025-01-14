import React, { useState, Fragment } from "react";
import "./Search.css";
import MetaData from "../layout/metaData";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <form className="search-box" onSubmit={searchSubmitHandler}>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search a product..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input type="submit" value="Search" />
                </div>
            </form>
        </Fragment>
    );
};

export default Search;

