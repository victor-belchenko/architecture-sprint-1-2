import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

// Удаляем serviceWorker, так как он не нужен с кастомным Webpack
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Убираем вызов serviceWorker.unregister(), так как он больше не импортируется
// serviceWorker.unregister();