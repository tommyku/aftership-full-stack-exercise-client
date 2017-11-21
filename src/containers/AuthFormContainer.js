import { AuthForm } from '../components';
import { login, tokenCheck } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const login = state.converty.flags.login;
  const tokenChecked = state.converty.flags.tokenChecked;
  const user = state.converty.user;
  return { user, login, tokenChecked };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (payload) => {
      dispatch(login(payload));
    },
    handleTokenCheck: (token) => {
      dispatch(tokenCheck(token));
    }
  };
};

const AuthFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);

export default AuthFormContainer;
