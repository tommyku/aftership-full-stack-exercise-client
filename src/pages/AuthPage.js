import React, { PureComponent } from 'react';
import AuthFormContainer from '../containers/AuthFormContainer';

class AuthPage extends PureComponent {
  render() {
    return (
      <section className='login-page'>
        <AuthFormContainer />
      </section>
    );
  }
}

export default AuthPage;
