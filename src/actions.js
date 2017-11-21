import { push } from 'react-router-redux';
import store from 'store';

export const login = ({ username, password }) => {
  return (dispatch) => {
    const body = JSON.stringify({ username, password });
    const request = {
      method: 'POST',
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return fetch('http://localhost:8080/user/sign_in', request)
      .then((res) => (res.ok ? authSuccess(dispatch, res) : loginFailure(res)));
  };
};

export const signUp = ({ username, password, appId }) => {
  return (dispatch) => {
    const body = JSON.stringify({ username, password, appId });
    const request = {
      method: 'POST',
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return fetch('http://localhost:8080/user/sign_up', request)
      .then((res) => (res.ok ? authSuccess(dispatch, res) : signUpFailure(res)));
  };
};

export const tokenCheck = (token) => {
  return (dispatch) => {
    const request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    return fetch('http://localhost:8080/user', request)
      .then((res) => (res.ok ? authSuccess(dispatch, res) : tokenActionFailure(res)));
  };
};

export const getUserCurrencies = (token) => {
  return (dispatch) => {
    const request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    return fetch('http://localhost:8080/usercurrency', request)
      .then((res) => (res.ok ? getUserCurrenciesSuccess(dispatch, res) : tokenActionFailure(dispatch, res)));
  };
};

export const getCurrencies = () => {
  return (dispatch) => {
    const request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    return fetch('https://openexchangerates.org/api/currencies.json', request)
      .then((res) => (res.ok ? getCurrenciesSuccess(dispatch, res) : noOpsFailure()));
  };
};

function authSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      const { username, appId, token } = response.success;
      const user = { username, appId, token };

      store.set('user', user);

      dispatch({ type: '@@converty/AUTH_SUCCESS', payload: user });
      dispatch(push('/'));
    });
}

function getCurrenciesSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      store.set('currencies', response);
      dispatch({ type: '@@converty/GET_CURRENCIES', payload: response });
    });
}

function getUserCurrenciesSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      const { currencies } = response.success;

      store.set('favoriteCurrencies', currencies);

      dispatch({ type: '@@converty/FETCH_FAVORITE', payload: { currencies }});
    });
}

function tokenActionFailure(dispatch) {
  store.set('user', null);
  store.set('favoriteCurrencies', null);

  dispatch({ type: 'TOKEN_ACTION_FAILURE', payload: {} });
  dispatch(push('/auth'));
}

function signUpFailure(res) {
  res.json()
    .then(console.log);
}

function loginFailure(res) {
}

function noOpsFailure() {
  // do nothing
}
