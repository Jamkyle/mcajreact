import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './styles/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {StripeProvider} from 'react-stripe-elements';
import store from './Module/store'

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_DD5S71d8Y0UIIsExbpR0Kfvf">
      <App />
    </StripeProvider>
  </Provider> ,
  document.getElementById('root'));
registerServiceWorker();
