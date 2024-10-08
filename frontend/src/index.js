import "bootstrap/dist/css/bootstrap.min.css";
//import $ from 'jquery';
//import Popper from 'popper.js';
//import Popper from '@popperjs/core';
import "bootstrap/dist/js/bootstrap.bundle.min";
//import { Modal } from 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "leaflet/dist/leaflet.css";
import "./index.css";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/fonts/fa-solid-900.ttf"; // or the correct font file if available
import "./assets/fonts/fa-solid-900.woff2";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
