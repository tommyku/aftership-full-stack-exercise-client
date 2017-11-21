import React, { PureComponent } from 'react';
import SignUpFormContainer from '../containers/SignUpFormContainer';

class SignUpPage extends PureComponent {
  render() {
    return (
      <section className='login-page'>
        <SignUpFormContainer />
      </section>
    );
  }
}

export default SignUpPage;

