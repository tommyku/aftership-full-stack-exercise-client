import React, { PureComponent } from 'react';
import IndexContainer from '../containers/IndexContainer';

class IndexPage extends PureComponent {
  render() {
    return (
      <section className='index-page'>
        <IndexContainer />
      </section>
    );
  }
}

export default IndexPage;
