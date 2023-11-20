import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './Containers/app.jsx';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import deviceReadReducer from './Containers/DeviceRead/deviceReadReducer.jsx';
import deviceIndexReducer from './Containers/DeviceIndex/deviceIndexReducer.jsx';
import clothReadReducer from './Containers/ClothRead/clothReadReducer.jsx';
import clothIndexReducer from './Containers/ClothIndex/clothIndexReducer.jsx';

const rootReducer = combineReducers({
    deviceReadReducer,
    deviceIndexReducer,
    clothReadReducer,
    clothIndexReducer
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