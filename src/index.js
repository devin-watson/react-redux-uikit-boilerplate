import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App/index';
import * as serviceWorker from './serviceWorker';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// loads the Icon plugin
UIkit.use(Icons);

const component = (
    <Provider store={configureStore()}>
      <App />
    </Provider>
);

const rootElement = document.getElementById('root');

ReactDOM.render(component, rootElement);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
