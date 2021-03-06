import store from 'store';

const user = store.get('user') || {};
const favoriteCurrencies = store.get('favoriteCurrencies') || [];
const currencies = store.get('currencies') || {};
const currentConversion = store.get('currentConversion') || {};
const conversionResult = store.get('conversionResult') || {};
const currencyHistory = store.get('currencyHistory') || {};

const flags = {
  login: (user['username'] && user['appId'] && user['token']) !== null,
  tokenChecked: false
};

const initialState = {
  user,
  favoriteCurrencies,
  currencies,
  flags,
  currentConversion,
  conversionResult,
  currencyHistory
};

const convertyApp = (state = initialState, action) => { const convertyAction = action.type.match(/^@@converty\/(.*)$/);
  if (convertyAction) {
    switch (convertyAction[1]) {
    case 'AUTH_SUCCESS':
      return Object.assign({}, state, {
        user: {
          username: action.payload.username,
          appId: action.payload.appId,
          token: action.payload.token
        },
        flags: {
          login: true,
          tokenChecked: true
        }
      });
    case 'LOCAL_CONVERSION':
      return Object.assign({}, state, {
        conversionResult: action.payload
      });
    case 'FETCH_FAVORITE':
      return Object.assign({}, state, {
        favoriteCurrencies: action.payload.currencies
      });
    case 'GET_CONVERSION':
      return Object.assign({}, state, {
        currentConversion: action.payload
      });
    case 'GET_CURRENCIES':
      return Object.assign({}, state, {
        currencies: action.payload
      });
    case 'GET_HISTORY':
      return Object.assign({}, state, {
        currencyHistory: action.payload
      });
    case 'TOKEN_ACTION_FAILURE':
    case 'AUTH_FAILURE':
      return Object.assign({}, state, {
        user: null,
        flags: { login: false, tokenChecked: false }
      });
    default:
      return state;
    }
  } else {
    return state;
  }
};

export default convertyApp;
