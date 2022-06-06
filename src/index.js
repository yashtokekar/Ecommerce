import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import "antd/dist/antd.css"

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/index.js';

//store
const store = configureStore({
  reducer: rootReducer,
}, composeWithDevTools())

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
   ,
    
  //</React.StrictMode>
  document.getElementById('root')
);


