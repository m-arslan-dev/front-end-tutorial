import React from 'react';
import ReactDOM from 'react-dom';
import './styles/test.scss';

const unused = 'something';

const App = () => (
  <h1 className="box">
    My React {unused} and TypeScript App!! {new Date().toLocaleDateString()}
  </h1>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
