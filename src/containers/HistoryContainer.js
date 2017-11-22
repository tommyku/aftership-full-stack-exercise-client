import { HistoryForm } from '../components';
import { getHistory } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.converty.user,
    currencies: state.converty.currencies,
    currencyHistory: state.converty.currencyHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: ({ from, to, date, appId }) => {
      dispatch(getHistory({ from, to, date, appId }));
    }
  };
};

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryForm);

export default HistoryContainer;
