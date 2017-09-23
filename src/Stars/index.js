import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import './styles.css';

export default function Stars({
  selected,
  total = 5,
  disabled = false,
  className = '',
  onChange
}) {
  // We generate a unique random ID so that we can have multiple
  // instances of the component on the same page.
  const id = uniqueId('rating-');
  const stars = Array(total)
    .fill(0)
    .map((el, index) => {
      const value = index + 1;
      const name = `${id}-stars-${value}`;

      return (
        <span key={value} className="Star">
          <input
            type="radio"
            name={`stars-${id}`}
            value={value}
            id={name}
            className="Star__radio"
            onChange={onChange}
            checked={selected === value}
            disabled={disabled} />

          <label
            className="Star__label"
            htmlFor={name} />
        </span>
      );
    });

  return (
    <fieldset className={className}>
      {stars}
    </fieldset>
  );
}

Stars.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  selected: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
