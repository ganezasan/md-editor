import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './redux/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root'),
);
registerServiceWorker();
