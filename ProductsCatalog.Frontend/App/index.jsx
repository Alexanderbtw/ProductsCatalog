import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Containers/app.jsx';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import "antd/dist/reset.css";

import productReadReducer from './Containers/ProductRead/productReadReducer.jsx';
import productIndexReducer from './Containers/ProductIndex/productIndexReducer.jsx'

const rootReducer = combineReducers({
    productReadReducer,
    productIndexReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

const root = createRoot(document.getElementById('content'));
root.render(
    <Provider store={ store }>
        <App />
    </Provider>
);