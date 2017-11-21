import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    if (this.props.user.token && this.props.login && !this.props.tokenChecked) {
      this.props.handleTokenCheck(this.props.user.token);
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const username = this.refs['username'].value;
    const password = this.refs['password'].value;
    this.props.handleLogin({ username, password });
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' ref='username' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' ref='password' />
        </div>
        <div>
          <button type='button' onClick={ this.handleLogin }>Login</button>
        </div>
        <div>
          <Link to='/sign_up'>
            <button type='button'>Sign up</button>
          </Link>
        </div>
      </form>
    );
  }
}

AuthForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleTokenCheck: PropTypes.func.isRequired
};

export default AuthForm;
