import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
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
    // Once the form was submitted, we don't allow any
    // further interaction with the component.
    !this.state.submitted && this.setState({
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
    const {rating, submitted} = this.state;
    const {total, title, buttonText, successMessage} = this.props;
    const className = classnames('Rating', {
      'Rating--confirmation': submitted
    });

    return (
      <div className={className}>
        {
          // Display a confirmation message only if the form was submitted.
          submitted && (
            <div className="Rating__message">
              {successMessage}
            </div>
          )
        }

        <form className="Rating__form">
          <div className="Rating__title">{title}</div>

          <Stars
            className="Rating__stars"
            total={total}
            selected={rating}
            disabled={submitted}
            onChange={this.handleChange} />

          <button className="Rating__button" disabled={submitted} onClick={this.handleSubmit}>
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

Rating.defaultProps = {
  total: 5,
  title: 'Rate this product',
  buttonText: 'Apply',
  successMessage: 'Thanks for your rating!'
};

Rating.propTypes = {
  stars: PropTypes.number,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}
