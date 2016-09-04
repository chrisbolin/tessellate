import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducer";
import actions from "./actions";
import { undoable } from "./undo";
import { updateHash, getElementsFromHash } from "./persist";

// STATE //

const initialState = {
  past: [],
  present: {
    lastPosition: null,
    selectedIndex: null,
    showMenu: true,
    dragging: false,
    elements: getElementsFromHash(),
  },
  future: []
};

// UNDO //

const typesToRecord = [
  actions.EDIT_ELEMENT,
  actions.ADD_ELEMENT,
  actions.DELETE_ELEMENT,
  actions.NUDGE_ELEMENT,
  actions.REORDER_ELEMENT,
  actions.START_DRAG,
];

const filterUndo = (action) => {
  return typesToRecord.indexOf(action.type) !== -1;
};

const mergeUndoStates = (currentState, undoState) => {
  return {
    ...currentState,
    elements: undoState.elements
  };
};

const undoableReducer = undoable(reducer, {
  filter: filterUndo,
  merge: mergeUndoStates,
});

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
  const typesToPersist = [...typesToRecord, actions.END_SELECT];
  if (typesToPersist.indexOf(action.type) !== -1) {
    updateHash(store.getState().present.elements);
  }
  return result;
};

// EXPORT //

export default createStore(
  undoableReducer,
  initialState,
  compose(
    applyMiddleware(loggerMiddleware, hashMiddleware),
    addDevTools()
  )
);
