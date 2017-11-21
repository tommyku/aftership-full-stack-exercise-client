import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    const username = this.refs['username'].value;
    const password = this.refs['password'].value;
    const appId = this.refs['appId'].value;
    this.props.handleSignUp({ username, password, appId });
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
          <label htmlFor='appId'>App ID</label>
          <input type='text' name='appId' id='appId' ref='appId' />
        </div>
        <div>
          <button type='button' onClick={ this.handleSignUp }>Sign Up</button>
        </div>
        <div>
          <Link to='/auth'>
            <button type='button'>Login</button>
          </Link>
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired
};

export default SignUpForm;
