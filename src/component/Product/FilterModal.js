import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
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

const FilterModal = ({ open, handleClose, applyFilters }) => {
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const navigate = useNavigate();

  const priceHandler = (event, newPrice) => setPrice(newPrice);
  const categoryHandler = (category) => setCategory(category);
  const ratingsHandler = (event, newRating) => setRatings(newRating);

  const handleApplyFilters = () => {
    applyFilters({ price, category, ratings });
    handleClose();
  };

  const handleClearFilters = () => {
    setPrice([0, 25000]);
    setCategory("");
    setRatings(0);
    handleClose();
    clearFilters();
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
          {categories.map((e) => (
            <li
              key={e}
              className={`category-link ${category === e ? 'filtered-category' : ''}`}
              onClick={() => categoryHandler(e)}
            >
              {e}
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
          <button onClick={handleApplyFilters} className="apply-button">Done</button>
          <button onClick={handleClearFilters} className="cancel-button">Clear Filters</button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
