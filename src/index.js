import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux"
import store from './components/store'

//const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store} >
    <App />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
