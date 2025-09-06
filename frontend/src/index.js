import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";
dotenv.config();
const root = ReactDOM.createRoot(document.getElementById('root'));

// Get Auth0 configuration from environment variables
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI;

root.render(
  // <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={`https://${domain}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  // </React.StrictMode>
);


