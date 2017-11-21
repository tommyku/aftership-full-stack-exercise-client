import { AuthForm } from '../components';
import { login } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (payload) => {
      dispatch(login(payload));
    }
  };
};

const AuthFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);

export default AuthFormContainer;
