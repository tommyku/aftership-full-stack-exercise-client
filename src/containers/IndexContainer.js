import { IndexForm } from '../components';
import { getUserCurrencies } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const tokenChecked = state.converty.flags.tokenChecked;
  const login = state.converty.flags.login;
  const user = state.converty.user;
  return { user, tokenChecked, login };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetUserCurrencies: (token) => {
      dispatch(getUserCurrencies(token));
    },
    redirectToLogin: () => {
      dispatch(push('/auth'));
    }
  };
};

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexForm);

export default IndexContainer;

