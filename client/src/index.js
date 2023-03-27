import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);