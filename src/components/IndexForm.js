import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IndexForm extends Component {
  shouldTokenCheck() {
    return (this.props.tokenChecked || !this.props.login || !this.props.user.token);
  }

  componentWillMount() {
    if (this.shouldTokenCheck()) {
      this.props.redirectToLogin();
    }
  }

  componentDidMount() {
    if (this.shouldTokenCheck()) return;

    if (Object.keys(this.props.currencies).length === 0) {
      this.props.getCurrencies();
    }
    this.props.getUserCurrencies(this.props.user.token);
  }

  render() {
    return (
      <div>Hi</div>
    );
  }
}

IndexForm.propTypes = {
  redirectToLogin: PropTypes.func.isRequired,
  getUserCurrencies: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired
};

export default IndexForm;
