import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon  style={{ color: 'yellow' }} key={i} icon={faStar} />);
  }
  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon  style={{ color: 'yellow' }} key="half" icon={faStarHalfAlt} />);
  }
  const remainingStars = 5 - (fullStars + (hasHalfStar ? 0.5 : 0));
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon  style={{ color: 'yellow', opacity: 0.3  }} key={`empty${i}`} icon={faStar} />);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
