import store from 'store';

const user = store.get('user') || {};

const flags = {
  login: (user['username'] && user['appId'] && user['token']) !== null,
};

const initialState = {
  user,
  flags
};

const convertyApp = (state = initialState, action) => {
  const convertyAction = action.type.match(/^@@converty\/(.*)$/);
  if (convertyAction) {
    switch (convertyAction[1]) {
    case 'AUTH_SUCCESS':
      return Object.assign({
        user: {
          username: action.payload.username,
          appId: action.payload.appId,
          token: action.payload.token
        },
        flags: {
          login: true
        }
      }, state);
    case 'AUTH_FAILURE':
      return Object.assign({
        user: null,
        flags: { login: false }
      }, state);
    default:
      return state;
    }
  } else {
    return state;
  }
};

export default convertyApp;
