import React, { PureComponent } from 'react';
import { Navigation } from '../components';
import IndexContainer from '../containers/IndexContainer';
import HistoryContainer from '../containers/HistoryContainer';

class HistoryPage extends PureComponent {
  render() {
    return (
      <section className='history-page'>
        <Navigation />
        <IndexContainer />
        <h1>Historical Rates</h1>
        <HistoryContainer />
      </section>
    );
  }
}

export default HistoryPage;
