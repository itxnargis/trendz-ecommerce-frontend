import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.ratings,
        isHalf: true,
    };

    return (
        <div className="review-card">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span className="review-card-comment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;