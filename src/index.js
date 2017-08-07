import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import preloadResources from './resource-loader';
import { singlePlayerMiddleware } from './middleware/game/single-player-middleware';
import { game } from './reducer/game';
import App from './containers/App';
import Loading from './components/Loading';

import 'font-awesome/css/font-awesome.css';
import './index.css';

import 'web-animations-js';

const store = createStore(
  combineReducers({
    game,
  }),
  composeWithDevTools(
    applyMiddleware(singlePlayerMiddleware, createLogger())
  )
);

ReactDOM.render((
  <Loading message="Loading resources..."/>
), document.getElementById('root'));

preloadResources().then(() => {
  ReactDOM.render((
    <Provider store={store}>
      <App/>
    </Provider>
  ), document.getElementById('root'));
});
