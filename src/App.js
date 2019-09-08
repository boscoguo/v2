import React, { Component } from 'react';
import { GlobalStyle } from './style';
import store from './store/index'
import { Provider } from 'react-redux'
import Page from './pages/index'


class App extends Component {
  render() {
    return (
      // <div className="dell">
      <Provider store = {store}>        
          <GlobalStyle/>
          <Page />
      </Provider>      
      /// </div>
    );
  }
}

export default App;
