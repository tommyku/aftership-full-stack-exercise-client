import { IndexForm } from '../components';
import { getUserCurrencies, getCurrencies } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.converty.user,
    tokenChecked: state.converty.flags.tokenChecked,
    login: state.converty.flags.login,
    favoriteCurrencies: state.converty.favoriteCurrencies,
    currencies: state.converty.currencies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCurrencies: (token) => {
      dispatch(getUserCurrencies(token));
    },
    redirectToLogin: () => {
      dispatch(push('/auth'));
    },
    getCurrencies: () => {
      dispatch(getCurrencies());
    }
  };
};

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexForm);

export default IndexContainer;

