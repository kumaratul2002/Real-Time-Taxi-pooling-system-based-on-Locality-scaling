import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get Auth0 configuration from environment variables
const domain = process.env.REACT_APP_AUTH0_DOMAIN || "dev-ldcegphct8my5c54.us.auth0.com";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "lG5m5vI7hvBxDpbNMlKW7EMbqkl3j6wX";
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI || window.location.origin;

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


