import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth0Provider
    domain="dev-yhs881fzupehriod.us.auth0.com"
    clientId="PlvsKZ6moL50kk1LLjfeXwHClIQoWpyW"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>

  


  // </React.StrictMode>
);


