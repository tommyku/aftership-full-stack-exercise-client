import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, SignUpPage, IndexPage, NotFoundPage } from './pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/auth' exact component={AuthPage} />
        <Route path='/sign_up' exact component={SignUpPage} />
        <Route path='/404' exact component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    );
  }
}

export default App;
