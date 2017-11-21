import { SignUpForm } from '../components';
import { signUp, tokenCheck } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const login = state.converty.flags.login;
  const tokenChecked = state.converty.flags.tokenChecked;
  const user = state.converty.user;
  return { user, login, tokenChecked };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (payload) => {
      dispatch(signUp(payload));
    },
    handleTokenCheck: (token) => {
      dispatch(tokenCheck(token));
    }
  };
};

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);

export default SignUpFormContainer;
