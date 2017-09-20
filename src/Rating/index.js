import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';

export default class Rating extends React.Component {
  constructor() {
    super();

    this.state = {
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
    const className = classnames('Rating', {
      'Rating--confirmation': this.state.submitted
    });

    const stars = Array(5)
      .fill(0)
      .map((el, index) => {
        const value = index + 1;

        return (
          <span key={value}>
            <input
              type="radio"
              name="stars"
              value={value}
              id={`rating-stars-${value}`}
              className="Rating__radio"
              onChange={this.handleChange}
              checked={this.state.rating === value} />

            <label
              className="Rating__label"
              htmlFor={`rating-stars-${value}`} />
          </span>
        );
      });

    return (
      <div className={className}>
        {
          this.state.submitted && (
            <div className="Rating__message">
              Thanks for your rating!
            </div>
          )
        }

        <form className="Rating__form">
          <div className="Rating__title">Rate this product</div>
          <fieldset className="Rating__stars">{stars}</fieldset>
          <button type="submit" className="Rating__button" onClick={this.handleSubmit}>Apply</button>
        </form>
      </div>
    );
  }
}

Rating.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
