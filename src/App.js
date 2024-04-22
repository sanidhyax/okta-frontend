import { Provider } from 'react-redux';
import './App.css';
import { Navbar } from './components/Navbar';
import ProductCard from './components/ProductCard';
import { ProductCatalogue } from './components/ProductCatalogue';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import Application from './components/Application';

function App() {
  return (

    <Auth0Provider
      domain="dev-k87uat5ysn3krse5.us.auth0.com"
      clientId="VZbWVB6t4FU3KFJZtCoMZJxxpPmQr6CW"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <Application />
      </Provider>
    </Auth0Provider>
  );
}

export default App;
