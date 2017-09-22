import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import './styles.css';

export default class Rating extends React.Component {
  constructor() {
    super();

    this.state = {
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
              id={`${this.state.id}-stars-${value}`}
              className="Rating__radio"
              onChange={this.handleChange}
              checked={this.state.rating === value} />

            <label
              className="Rating__label"
              htmlFor={`${this.state.id}-stars-${value}`} />
          </span>
        );
      });

    return (
      <div className={className}>
        {
          this.state.submitted && (
            <div className="Rating__message">
              {this.props.successMessage}
            </div>
          )
        }

        <form className="Rating__form">
          <div className="Rating__title">{this.props.title}</div>
          <fieldset className="Rating__stars">{stars}</fieldset>
          <button type="submit" className="Rating__button" onClick={this.handleSubmit}>
            {this.props.buttonText}
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
