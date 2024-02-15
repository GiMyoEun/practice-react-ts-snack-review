import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/plugin.css';
import './css/template.css';
import './css/common.css';
import './css/setting.css';
import './css/style.css';

import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const cors = require('cors')({
    origin: true,
    credentials: true,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
