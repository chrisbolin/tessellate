import React from "react";
import ReactDOM from "react-dom";

import App from "./connected-app";
import store from "./store";
import { startListening } from "./location";

import setupPerf from "./performance"
import setupConsole from "./console"

ReactDOM.render(
  <App store={store}/>,
  document.getElementById("app")
);

startListening();
setupPerf();
setupConsole();

console.info("TESSELLATE", VERSION);
