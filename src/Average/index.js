import React from 'react';
import PropTypes from 'prop-types';
import activeStar from '../Rating/star-active.svg';
import inactiveStar from '../Rating/star-inactive.svg';
import './styles.css';

export default function Average({ title = 'Average rating', rating = 0 }) {
  // `rating` must be an integer in the [0, 5] range.
  // Negative numbers default to 0. Numbers greater than 5 default to 5.
  let _rating;

  if (rating >= 0 && rating <= 5) {
    _rating = rating;
  } else if (rating < 0) {
    _rating = 0;
  } else if (rating > 5) {
    _rating = 5;
  }

  const blurb = `${_rating} stars out of 5`;
  const stars = Array(5)
    .fill(0)
    .map((el, index) => {
      const value = index + 1;
      const image = value <= _rating ? activeStar : inactiveStar;

      return (
        <img src={image} className="Average__star" alt="" key={value} />
      );
    });

  return (
    <div className="Average">
      <span className="Average__title">{title}</span>
      <span className="Average__stars" title={blurb} aria-label={blurb}>
        {stars}
      </span>
    </div>
  );
}

Average.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.number
};
