import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import './styles.css';

export default class Stars extends React.Component {
  constructor() {
    super();

    this.state = {
      // We keep track of which element has been hovered so that
      // we can highlight all previous stars too.
      hovered: null,

      // Generate a unique random ID so that we can have multiple
      // instances of the component on the same page.
      id: uniqueId('rating-')
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver(event) {
    // Once the form is submitted, the form should be disabled so that
    // the user is no longer to interact with the it.
    !this.props.disabled && this.setState({
      hovered: event.target.dataset.star
    });
  }

  handleMouseLeave() {
    !this.props.disabled && this.setState({
      hovered: null
    });
  }

  render() {
    const {className, total, selected, disabled, onChange} = this.props;
    const {id, hovered} = this.state;

    // If passed in an invalid number of stars to render such as a
    // negative or non-integer value, fallback to `5`.
    const numberOfStars = Number.isInteger(total) && total > 0 ? total : 5;
    const stars = Array(numberOfStars)
      .fill(0)
      .map((el, index) => {
        const value = index + 1;
        const name = `${id}-stars-${value}`;
        const starClassName = classnames('Star', {
          'Star--active': value < selected || value < hovered
        });

        return (
          <span key={value} className={starClassName}>
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
              htmlFor={name}
              data-star={value}
              className="Star__label"
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave} />
          </span>
        );
      });

    return (
      <fieldset className={className}>
        {stars}
      </fieldset>
    );
  }
}

Stars.defaultProps = {
  className: '',
  disabled: false
};

Stars.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number.isRequired,
  selected: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
