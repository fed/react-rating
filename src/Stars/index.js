import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import './styles.css';

export default class Stars extends React.Component {
  constructor() {
    super();

    this.state = {
      hover: null
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver(event) {
    this.setState({
      hover: event.target.dataset.star
    });
  }

  handleMouseLeave() {
    this.setState({
      hover: null
    });
  }

  render() {
    const {className, total, selected, disabled, onChange} = this.props;

    // We generate a unique random ID so that we can have multiple
    // instances of the component on the same page.
    const id = uniqueId('rating-');

    //
    const composedClassName = classnames('Stars', className);

    const stars = Array(total)
      .fill(0)
      .map((el, index) => {
        const value = index + 1;
        const name = `${id}-stars-${value}`;
        const starClassName = classnames('Star', {
          'Star--active': value < this.state.hover
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
      <fieldset className={composedClassName}>
        {stars}
      </fieldset>
    );
  }
}

Stars.defaultProps = {
  total: 5,
  disabled: false,
  className: ''
};

Stars.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  selected: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
