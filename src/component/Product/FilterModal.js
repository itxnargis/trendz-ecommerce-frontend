import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import './FilterModal.css';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Jewellery",
  "Watches",
  "Camera",
  "SmartPhones",
];

const FilterModal = ({ open, handleClose }) => {
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const categoryHandler = (category) => {
    setCategory(category);
  };

  const ratingsHandler = (event, newRating) => {
    setRatings(newRating);
  };

  const clearFilters = () => {
    setPrice([0, 25000]);
    setCategory("");
    setRatings(0);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="filter-content">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
        <Typography>Categories</Typography>
        <ul className="category-box">
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
        <div className="filter-buttons">
          <button onClick={handleClose} className="apply-button">Done</button>
          <button onClick={clearFilters} className="cancel-button">Clear Filters</button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;