import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CurrencySelection } from './';

class ConversionForm extends Component {
  constructor(props) {
    super(props);
    this.handleGetConversion = this.handleGetConversion.bind(this);
  }

  componentDidMount() {
    const isEmptyCurrencies = Object.keys(this.props.currencies).length === 0;

    const isEmptyConversion = Object.keys(this.props.currentConversion).length === 0;
    const isStaleConversion = ((new Date()).getTime() / 1000 - this.props.currentConversion.timestamp) / 86400 > 1;
    const isAppIdAvailable = this.props.user && this.props.user.appId;

    if (isEmptyCurrencies) {
      this.props.getCurrencies();
    }
    if (isAppIdAvailable && (isStaleConversion || isEmptyConversion)) {
      this.props.getConversions(this.props.user.appId);
    }
  }

  handleGetConversion() {
    const amount = parseFloat(this.refs['amount'].value);
    const from = this.selectFrom.value;
    const to = this.selectTo.value;
    this.props.localConversion({
      from, to, amount, currentConversion: this.props.currentConversion
    });
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor='from'>From</label>
          <CurrencySelection name='from'
            currencies={ this.props.currencies }
            defaultValue={ this.props.conversionResult.from }
            setRef={ (select) => this.selectFrom = select } />
        </div>
        <div>
          <label htmlFor='to'>To</label>
          <CurrencySelection name='to'
            currencies={ this.props.currencies }
            defaultValue={ this.props.conversionResult.to }
            setRef={ (select) => this.selectTo = select } />
        </div>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input type='number'
            step='0.01'
            min='0'
            ref='amount'
            defaultValue={ this.props.conversionResult.amount } />
        </div>
        <div>
          <button type='button' onClick={ this.handleGetConversion }>Convert</button>
        </div>
        <div>
          { this.props.conversionResult.resultAmount }
        </div>
      </form>
    );
  }

}
ConversionForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getConversions: PropTypes.func.isRequired,
  localConversion: PropTypes.func.isRequired
};

export default ConversionForm;
