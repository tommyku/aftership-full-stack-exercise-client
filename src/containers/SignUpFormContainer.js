import { SignUpForm } from '../components';
import { signUp } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (payload) => {
      dispatch(signUp(payload));
    }
  };
};

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);

export default SignUpFormContainer;
