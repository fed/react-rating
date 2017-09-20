import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Preview({ title, children }) {
  return (
    <div className="Preview">
      {
        !!title && (
          <div className="Preview__title">
            {title}
          </div>
        )
      }

      <div className="Preview__children">
        {children}
      </div>
    </div>
  );
}

Preview.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};
