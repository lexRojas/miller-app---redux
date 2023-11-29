import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import UseEstado from "./context/UseEstado";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="flex ">
      <UseEstado>
        <App/>
      </UseEstado>
    </div>
  </React.StrictMode>
);

