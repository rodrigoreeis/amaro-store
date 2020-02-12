import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './ducks';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['minicart', 'quickview'],
  blacklist: ['overlay'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middlewares;
if (process.env.NODE_ENV !== 'production') {
  middlewares = [thunk, logger];
} else {
  middlewares = [thunk];
}

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

export { store, persistor };
