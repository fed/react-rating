import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import './styles.css';

export default class Rating extends React.Component {
  constructor() {
    super();

    this.state = {
      // We generate a unique random ID so that we can have multiple
      // instances of the component on the same page.
      id: uniqueId('rating-'),
      rating: 0,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      rating: Number(event.target.value)
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.rating);

    this.setState({
      submitted: true
    });
  }

  render() {
    const {id, rating, submitted} = this.state;
    const {title, buttonText, successMessage} = this.props;
    const className = classnames('Rating', {
      'Rating--confirmation': submitted
    });

    const stars = Array(5)
      .fill(0)
      .map((el, index) => {
        const value = index + 1;
        const name = `${id}-stars-${value}`;

        return (
          <span key={value} className="Rating__star">
            <input
              type="radio"
              name="stars"
              value={value}
              id={name}
              className="Rating__radio"
              onChange={this.handleChange}
              checked={rating === value} />

            <label
              className="Rating__label"
              htmlFor={name} />
          </span>
        );
      });

    return (
      <div className={className}>
        {
          submitted && (
            <div className="Rating__message">
              {successMessage}
            </div>
          )
        }

        <form className="Rating__form">
          <div className="Rating__title">{title}</div>
          <fieldset className="Rating__stars">{stars}</fieldset>
          <button type="submit" className="Rating__button" onClick={this.handleSubmit}>
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

Rating.defaultProps = {
  title: 'Rate this product',
  buttonText: 'Apply',
  successMessage: 'Thanks for your rating!'
};

Rating.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}
