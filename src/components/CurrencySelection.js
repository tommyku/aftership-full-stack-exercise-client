import React from 'react';

export default ({ setRef, currencies, name, ...others }) => (
  <select name={ name } id={ name } ref={ setRef } { ...others }>
    {
      Object.keys(currencies).map((code, index) => (
        <option value={ code } key={ `from-${index}` }>
          { `${code} (${currencies[code]})` }
        </option>
      ))
    }
  </select>
);
