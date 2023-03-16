import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthMiddleware from './helpers/AuthMiddleware';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthMiddleware>
          <App />
        </AuthMiddleware>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
