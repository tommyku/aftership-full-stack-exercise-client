import React, { PureComponent } from 'react';
import IndexContainer from '../containers/IndexContainer';
import ConversionContainer from '../containers/ConversionContainer';
//import UserCurrencyContainer from '../containers/UserCurrencyContainer';

class IndexPage extends PureComponent {
  render() {
    return (
      <section className='index-page'>
        <IndexContainer />
        <ConversionContainer />
      </section>
    );
  }
}

export default IndexPage;
