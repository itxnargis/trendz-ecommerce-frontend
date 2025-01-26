import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import "./FilterModal.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getProduct } from "../../actions/productAction"
import { FaTimes } from "react-icons/fa"

const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Jewellery", "Watches", "Camera", "SmartPhones"]

const FilterModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const navigate = useNavigate()

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  const categoryHandler = (selectedCategory) => {
    setCategory(selectedCategory)
  }

  const ratingsHandler = (event, newRating) => {
    setRatings(newRating)
  }

  const applyFilters = () => {
    navigate("/products")
    dispatch(getProduct("", 1, price, category, ratings))
    handleClose()
  }

  const clearFilters = () => {
    setPrice([0, 25000])
    setCategory("")
    setRatings(0)
    dispatch(getProduct("", 1, [0, 25000], "", 0))
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="filter-modal" aria-describedby="filter-modal-description">
      <div className="filter-content">
        <button className="close-modal" onClick={handleClose}>
          <FaTimes />
        </button>
       <h1 className="filter-heading">Filters</h1>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
          min={0}
          max={25000}
        />
        <Typography id="categories" gutterBottom>
          Categories
        </Typography>
        <ul className="category-box">
          {categories.map((cat) => (
            <li
              className={`category-link ${category === cat ? "active" : ""}`}
              key={cat}
              onClick={() => categoryHandler(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
        <Typography id="ratings-slider" gutterBottom>
          Ratings Above
        </Typography>
        <Slider
          value={ratings}
          onChange={ratingsHandler}
          aria-labelledby="ratings-slider"
          min={0}
          max={5}
          step={0.5}
          valueLabelDisplay="auto"
        />
        <div className="filter-buttons">
          <button onClick={applyFilters} className="apply-button">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="clear-button">
            Clear Filters
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default FilterModal

