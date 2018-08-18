import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import rootReducer from '../rootReducer';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const history = createHashHistory();
const enhancer = applyMiddleware(sagaMiddleware);

function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}

export default { configureStore, history };
