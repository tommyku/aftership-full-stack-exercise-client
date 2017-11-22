import React from 'react';
import { Link } from 'react-router';

const LinkStyle = {
  display: 'inline-block',
  marginRight: '1em'
};

export default () => (
  <nav>
    <Link to='/' style={ LinkStyle }>
      Convert
    </Link>
    <Link to='/history' style={ LinkStyle }>
      Historical Rates
    </Link>
  </nav>
);
