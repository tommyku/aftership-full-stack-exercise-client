import { push } from 'react-router-redux';

export const LOGIN = 'LOGIN';

export const login = ({ username, password }) => {
  return () => {
    const body = JSON.stringify({ username, password });
    return fetch('http://localhost:8080/user/sign_in', { method: 'POST', body })
      .then((res) => (res.ok ? loginSuccess(res) : loginFailure(res)));
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
      .then((res) => (res.ok ? signUpSuccess(dispatch, res) : signUpFailure(res)));
  };
};

function signUpSuccess(dispatch, res) {
  res.json()
    .then(console.log);
  dispatch(push('/'));
}

function signUpFailure(res) {
  res.json()
    .then(console.log);
}

function loginSuccess(res) {
  res.json()
    .then(console.log);
}

function loginFailure(res) {
  res.json()
    .then(console.log);
}
