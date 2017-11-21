import { ConversionForm } from '../components';
import { getCurrencies, getConversions, localConversion } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.converty.user,
    currencies: state.converty.currencies,
    currentConversion: state.converty.currentConversion,
    conversionResult: state.converty.conversionResult
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrencies: () => {
      dispatch(getCurrencies());
    },
    getConversions: (appId) => {
      dispatch(getConversions(appId));
    },
    localConversion: ({ from, to, amount, currentConversion }) => {
      dispatch(localConversion({
        from, to, amount, currentConversion
      }));
    }
  };
};

const ConversionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversionForm);

export default ConversionContainer;
