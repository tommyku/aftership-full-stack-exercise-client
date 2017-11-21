import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IndexForm extends Component {
  componentWillMount() {
    if (!this.props.tokenChecked || !this.props.login || !this.props.user.token) {
      this.props.redirectToLogin();
    }
  }

  render() {
    return (
      <div>Hi</div>
    );
  }
}

IndexForm.propTypes = {
  redirectToLogin: PropTypes.func.isRequired,
  handleGetUserCurrencies: PropTypes.func.isRequired
};

export default IndexForm;
