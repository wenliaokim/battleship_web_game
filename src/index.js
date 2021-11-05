import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store} >
    <App />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
