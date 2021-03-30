import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'
import { Provider } from "react-redux"
import reducer from "./reducer"
import { createStore } from "redux"


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
  

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
