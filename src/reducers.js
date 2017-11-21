import store from 'store';

const user = store.get('user') || {};
const favoriteCurrencies = store.get('favoriteCurrencies') || [];

const flags = {
  login: (user['username'] && user['appId'] && user['token']) !== null,
  tokenChecked: false
};

const initialState = {
  user,
  favoriteCurrencies,
  flags
};

const convertyApp = (state = initialState, action) => {
  const convertyAction = action.type.match(/^@@converty\/(.*)$/);
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
    case 'FETCH_FAVORITE':
      return Object.assign({}, state, {
        favoriteCurrencies: action.payload.currencies
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
