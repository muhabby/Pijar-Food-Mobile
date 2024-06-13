/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({});

// export default () => {
//   const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
//   const persistor = persistStore(store);
//   return {
//     store,
//     persistor,
//   };
// };

export let store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
);

export let persistor = persistStore(store);
