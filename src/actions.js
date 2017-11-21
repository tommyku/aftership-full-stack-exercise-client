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
      .then((res) => (res.ok ? authSuccess(dispatch, res) : loginFailure(res)));
  };
};

function authSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      const { username, appId, token } = response.success;
      const user = { username, appId, token };

      store.set('user', user);

      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      dispatch(push('/'));
    });
}

function signUpFailure(res) {
  res.json()
    .then(console.log);
}

function loginFailure(res) {
  res.json()
    .then(console.log);
}
