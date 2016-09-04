import { createHistory } from "history";

import actions from "./actions";
import store from "./store";

export const history = createHistory();

let unlisten = () => {};

export const startListening = () => {
  unlisten = history.listen((location) => {
    if (location.action !== "REPLACE") {
      store.dispatch({
        type: actions.LOCATION_CHANGE,
        href: history.getCurrentLocation().hash,
      });      
    }
  });
};

export const stopListening = unlisten;
