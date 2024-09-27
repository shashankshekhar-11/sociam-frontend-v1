import React from 'react'; //import react library
import ReactDOM from 'react-dom/client'; //import ReactDOM lib
import './index.css';
import App from './App'; //import App component
import { Provider } from 'react-redux'; // makes Redux store available to rest of app
import { store } from "./state";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/*potential problem during the development*/}
      <Provider store={store}> {/*react-redux component to make available Redux store*/}
          <App /> {/*main component of the application*/}
    </Provider>
  </React.StrictMode>
);
