import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './material-ui/NavBar'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <div>
        <NavBar/>
        <App/>
    </div>,
    document.getElementById('root')
);

registerServiceWorker();
