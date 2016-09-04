import { createStore, compose, applyMiddleware } from "redux";

import combinedReducer from "./combinedReducer";
import actions, { undoableActions, persistedActions } from "./actions";
import { undoable } from "./undo";
import { updateHash, getStateFromHash } from "./persist";

// STATE //

const initialState = {
  past: [],
  present: {
    lastPosition: null,
    selectedIndex: null,
    showMenu: true,
    dragging: false,
    backgroundColor: "#000000",
    ...getStateFromHash(),
  },
  future: []
};

// DEVTOOLS + LOGGING //

const useDevTools = !!window.devToolsExtension;
const useLogger = !useDevTools && location.hostname === "localhost";

const loggerMiddleware = store => next => action => {
  let result = next(action);
  if (useLogger) {
    console.group(action.type);
    console.log(store.getState());
    console.groupEnd();
  }
  return result;
};

const addDevTools = () => (
  useDevTools ? window.devToolsExtension() : f => f
);

// LOCATION UPDATING //

const hashMiddleware = store => next => action => {
  let result = next(action);
  if (persistedActions.indexOf(action.type) !== -1) {
    updateHash(store.getState().present);
  }
  return result;
};

// EXPORT //

const store = createStore(
  combinedReducer,
  initialState,
  compose(
    applyMiddleware(loggerMiddleware, hashMiddleware),
    addDevTools()
  )
);

export default store;
window._store = store;
