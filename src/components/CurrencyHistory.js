import React from 'react';

export default ({ history: {from, to, date, rates }}) => (
  <div>
    On { date },
    <br />
    { (1).toLocaleString('en-US', { style: 'currency', currency: from, maximumFractionDigits: 4 }) }
    =
    { (rates[to] / rates[from]).toLocaleString('en-US', { style: 'currency', currency: to, maximumFractionDigits: 4 }) }
  </div>
);

