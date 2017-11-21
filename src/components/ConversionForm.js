import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CurrencySelection = (props) => (
  <select name={ props.name } id={ props.name } ref={ props.setRef }>
    {
      Object.keys(props.currencies).map((code, index) => (
        <option value={ code } key={ `from-${index}` }>
          { props.currencies[code] }
        </option>
      ))
    }
  </select>
);

class ConversionForm extends Component {
  constructor(props) {
    super(props);
    this.handleGetConversion = this.handleGetConversion.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.currencies).length === 0) {
      this.props.getCurrencies();
    }
  }

  handleGetConversion() {
    const amount = parseFloat(this.refs['amount'].value);
    const from = this.selectFrom.value;
    const appId = this.props.user.appId;
    const to = this.selectTo.value;
    this.props.getConversion({ from, to, amount, appId });
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor='from'>From</label>
          <CurrencySelection name='from'
            currencies={ this.props.currencies }
            setRef={ (select) => this.selectFrom = select } />
        </div>
        <div>
          <label htmlFor='to'>To</label>
          <CurrencySelection name='to'
            currencies={ this.props.currencies }
            setRef={ (select) => this.selectTo = select } />
        </div>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input type='number' step='0.01' min='0' ref='amount' />
        </div>
        <div>
          <button type='button' onClick={ this.handleGetConversion }>Convert</button>
        </div>
      </form>
    );
  }
}

ConversionForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getConversion: PropTypes.func.isRequired
};

export default ConversionForm;
