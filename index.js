/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/router/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import React, {Component} from 'react';
// import storage from './src/redux/store';
import {store, persistor} from './src/redux/store';

// const {store, persistor} = storage();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
