import { ConversionForm } from '../components';
import { getCurrencies, getConversion } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.converty.user,
    currencies: state.converty.currencies,
    currentConversion: state.converty.currentConversion
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrencies: () => {
      dispatch(getCurrencies());
    },
    getConversion: ({ from, to, amount, appId }) => {
      dispatch(getConversion({ from, to, amount, appId }));
    }
  };
};

const ConversionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversionForm);

export default ConversionContainer;
