import React           from 'react';
import ReactDOM        from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App             from './App';
import './index.css';
import ElDebateClient  from './services/ElDebateClient';


ReactDOM.render(
  <App elDebateClient={ElDebateClient.build()}/>,
  document.getElementById('root')
);
