import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="miriamsilva.us.auth0.com"
    clientId="DKJK8N2W1N3grItnREMtfXK44UUVS4xw"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
