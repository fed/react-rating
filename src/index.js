import React from 'react';
import ReactDOM from 'react-dom';
import Styleguide from './Styleguide';
import 'array.prototype.fill'; // polyfill Array.prototype.fill for IE
import './index.css';

ReactDOM.render(
  <Styleguide />,
  document.getElementById('root')
);
