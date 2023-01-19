import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import { MenuProvider } from './components/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
      <MenuProvider>
       <Auth0Provider
        domain="dev-xhs6s7vmewmk7kug.us.auth0.com"
        clientId="6lE73KYJrCIPT9y5n4dFxspGNFNkPQ1s"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
      </MenuProvider>
    // </React.StrictMode>
);
