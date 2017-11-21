import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IndexForm extends Component {
  shouldTokenCheck() {
    return (!this.props.tokenChecked || !this.props.login || !this.props.user.token);
  }

  componentWillMount() {
    if (this.shouldTokenCheck()) {
      this.props.redirectToLogin();
    }
  }

  componentDidMount() {
    if (this.shouldTokenCheck()) return;

    this.props.getUserCurrencies(this.props.user.token);
  }

  render() {
    // this is a dummy element for redirection and fetching information
    return (<div></div>);
  }
}

IndexForm.propTypes = {
  redirectToLogin: PropTypes.func.isRequired,
  getUserCurrencies: PropTypes.func.isRequired
};

export default IndexForm;
