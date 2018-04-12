import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

ReactDOM.render(<Provider store={createStore(theReducer)}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
