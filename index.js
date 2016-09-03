import React from "react";
import ReactDOM from "react-dom";
import * as Perf from "react-addons-perf";

import App from "./connected-app";
import store from "./store";

ReactDOM.render(
  <App store={store}/>,
  document.getElementById("app")
);

window._store = store;
