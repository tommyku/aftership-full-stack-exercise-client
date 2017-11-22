import React, { PureComponent } from 'react';
import { Navigation } from '../components';
import IndexContainer from '../containers/IndexContainer';
import ConversionContainer from '../containers/ConversionContainer';
//import UserCurrencyContainer from '../containers/UserCurrencyContainer';

class IndexPage extends PureComponent {
  render() {
    return (
      <section className='index-page'>
        <Navigation />
        <IndexContainer />
        <h1>Currency Conversion</h1>
        <ConversionContainer />
      </section>
    );
  }
}

export default IndexPage;
