import React, { Component } from 'react';

import Home from './containers/Home/Home';
import Helmet from 'react-helmet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Price comparison app</title>
          <meta name="description" content="A price comparison app which lets you compare prices from largest online shopping sites like Amazon, Flipkart and Paytm" />
        </Helmet>
        <Home />
      </div>
    );
  }
}

export default App;
