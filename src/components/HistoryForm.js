import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CurrencySelection, CurrencyHistory } from './';

class HistoryForm extends Component {
  constructor(props) {
    super(props);
    this.handleGetHistory = this.handleGetHistory.bind(this);
  }

  handleGetHistory() {
    const from = this.selectFrom.value;
    const to = this.selectTo.value;
    const date = this.refs['date'].value;
    this.props.getHistory({
      from, to, date, appId: this.props.user.appId
    });
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor='from'>From</label>
          <CurrencySelection name='from'
            currencies={ this.props.currencies }
            defaultValue={ this.props.currencyHistory.from }
            setRef={ (select) => this.selectFrom = select } />
        </div>
        <div>
          <label htmlFor='to'>to</label>
          <CurrencySelection name='to'
            currencies={ this.props.currencies }
            defaultValue={ this.props.currencyHistory.to }
            setRef={ (select) => this.selectTo = select } />
        </div>
        <div>
          <label htmlFor='date'>date</label>
          <input type='date'
            name='date'
            id='date'
            ref='date'
            defaultValue={ this.props.currencyHistory.date } />
        </div>
        <div>
          <button type='button' onClick={ this.handleGetHistory }>Get rate</button>
        </div>
        <div>
          {
            Object.keys(this.props.currencyHistory).length &&
              <CurrencyHistory history={ this.props.currencyHistory } />
          }
        </div>
      </form>
    );
  }
}

HistoryForm.propTypes = {
  getHistory: PropTypes.func.isRequired
};

export default HistoryForm;
