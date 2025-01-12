import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import './FilterModal.css';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction';

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
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const categoryHandler = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const ratingsHandler = (event, newRating) => {
    setRatings(newRating);
  };

  const applyFilters = () => {
    dispatch(getProduct("", 1, price, category, ratings));
    handleClose();
  };

  const clearFilters = () => {
    setPrice([0, 25000]);
    setCategory("");
    setRatings(0);
    dispatch(getProduct("", 1, [0, 25000], "", 0));
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
          {categories.map((cat) => (
            <li
              className={`category-link ${category === cat ? 'active' : ''}`}
              key={cat}
              onClick={() => categoryHandler(cat)}
            >
              {cat}
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
          <button onClick={applyFilters} className="apply-button">Apply Filter</button>
          <button onClick={clearFilters} className="cancel-button">Clear Filters</button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
