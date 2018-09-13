import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import rootReducer from '../rootReducer';
import sagas from '../sagas';

const history = createHashHistory();

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
    })
  : compose;
/* eslint-enable no-underscore-dangle */
// saga
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept(
      '../rootReducer',
      () => store.replaceReducer(require('../rootReducer')), // eslint-disable-line global-require
    );
  }

  return store;
}

export default { configureStore, history };
