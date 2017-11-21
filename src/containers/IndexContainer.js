import { IndexForm } from '../components';
import { getUserCurrencies } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.converty.user,
    tokenChecked: state.converty.flags.tokenChecked,
    login: state.converty.flags.login,
    favoriteCurrencies: state.converty.favoriteCurrencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCurrencies: (token) => {
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

