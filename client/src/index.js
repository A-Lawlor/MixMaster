import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
=======
import ReactDOM from "react-dom";
>>>>>>> Main
import App from "./App";

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



import { BrowserRouter } from "react-router-dom";

<<<<<<< HEAD

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
=======
ReactDOM.render(
>>>>>>> Main
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
<<<<<<< HEAD
  
=======
  document.getElementById("root")
>>>>>>> Main
);