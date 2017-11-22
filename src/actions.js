import { push } from 'react-router-redux';
import store from 'store';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8080';

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
    return fetch(`${API_HOST}/user/sign_in`, request)
      .then((res) => (res.ok ? authSuccess(dispatch, res) : noOpsFailure()));
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
    return fetch(`${API_HOST}/user/sign_up`, request)
      .then((res) => (res.ok ? authSuccess(dispatch, res) : noOpsFailure()));
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
    return fetch(`${API_HOST}/user`, request)
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
    return fetch(`${API_HOST}/usercurrency`, request)
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

export const getConversions = (appId) => {
  return (dispatch) => {
    const request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;
    return fetch(url, request)
      .then((res) => (res.ok ? getConversionSuccess(dispatch, res) : noOpsFailure()));
  };
};

export const localConversion = ({ from, to, amount, currentConversion }) => {
  return (dispatch) => {
    const resultAmount = amount * currentConversion.rates[to] / currentConversion.rates[from];
    const result = {
      from, to, amount, resultAmount
    };
    store.set('conversionResult', result);
    dispatch({ type: '@@converty/LOCAL_CONVERSION', payload: result });
  };
};

export const getHistory = ({ from, to, date, appId }) => {
  return (dispatch) => {
    const request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=${appId}`;
    return fetch(url, request)
      .then((res) => (res.ok ? getHistorySuccess(dispatch, res, { from, to, date }) : noOpsFailure()));
  };
};

function authSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      const { username, appId, token } = response.success;
      const user = { username, appId, token };

      store.set('user', user);

      return dispatch({ type: '@@converty/AUTH_SUCCESS', payload: user });
    }).then(() => {
      return dispatch(push('/'));
    });
}

function getCurrenciesSuccess(dispatch, res) {
  res.json()
    .then((response) => {
      store.set('currencies', response);
      dispatch({ type: '@@converty/GET_CURRENCIES', payload: response });
    });
}

function getConversionSuccess(dispatch, res) {
  res.json()
    .then((apiResponse) => {
      const { timestamp, base, rates } = apiResponse;
      const currentConversion = {
        timestamp, base, rates
      };
      store.set('currentConversion', currentConversion);
      dispatch({ type: '@@converty/GET_CONVERSION', payload: currentConversion });
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

function getHistorySuccess(dispatch, res, { from, to, date }) {
  res.json()
    .then((response) => {
      const { timestamp, base, rates } = response;
      const currencyHistory = {
        base: base,
        from: from,
        to: to,
        date: date,
        timestamp,
        rates
      };

      store.set('currencyHistory', currencyHistory);

      dispatch({ type: '@@converty/GET_HISTORY', payload: currencyHistory });
    });
}

function tokenActionFailure(dispatch) {
  store.set('user', null);
  store.set('favoriteCurrencies', null);

  dispatch({ type: 'TOKEN_ACTION_FAILURE', payload: {} });
  dispatch(push('/auth'));
}

function noOpsFailure() {
  // TODO(tommy): error handling
}
