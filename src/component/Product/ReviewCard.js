import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating
                name="read-only"
                value={review.rating || 0} 
                readOnly
                precision={0.5}
            />
            <span className="review-card-comment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
