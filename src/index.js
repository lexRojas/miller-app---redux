import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from './context/store.js'
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="flex ">
      <Provider store = {store}>
        <App/>
      </Provider>
    </div>
  </React.StrictMode>
);

