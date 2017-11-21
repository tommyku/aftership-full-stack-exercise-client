import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import convertyApp from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import App from './App';
import { IndexRoute, Route, Redirect } from 'react-router';
import { AuthPage, SignUpPage, IndexPage, NotFoundPage } from './pages';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store;
const reducers = combineReducers({
  converty: convertyApp,
  routing: routerReducer
});

switch (process.env.NODE_ENV) {
case 'development':
  store = createStore(
    reducers, applyMiddleware( thunkMiddleware,
      routerMiddleware(hashHistory),
      createLogger()
    )
  );
  break;
default:
  store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(hashHistory)
    )
  );
}

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={IndexPage} />
        <Route path='auth' component={AuthPage} />
        <Route path='sign_up' component={SignUpPage} />
        <Route path='404' component={NotFoundPage} />
      </Route>
      <Redirect to='/404' />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
