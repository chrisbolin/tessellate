import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducer";
import actions from "./actions";
import { undoable } from "./undo";
import { updateHash, getElementsFromHash } from "./persist";

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

const filterUndo = (action) => {
  const typesToRecord = [
    actions.EDIT_ELEMENT,
    actions.ADD_ELEMENT,
    actions.DELETE_ELEMENT,
    actions.NUDGE_ELEMENT,
    actions.REORDER_ELEMENT,
    actions.START_DRAG,
  ];

  return typesToRecord.indexOf(action.type) !== -1;
};

const mergeUndoStates = (currentState, undoState) => {
  return {
    ...currentState,
    elements: undoState.elements
  };
};

const finalReducer = undoable(reducer, {
  filter: filterUndo,
  onUpdate: (state) => updateHash(state.elements),
  merge: mergeUndoStates,
});

const useDevTools = !!window.devToolsExtension;
const useLogger = !useDevTools && location.hostname === "localhost";

const logger = store => next => action => {
  let result = next(action);
  if (useLogger) {
    console.group(action.type);
    console.log(store.getState());
    console.groupEnd();
  }
  return result;
}

const addDevTools = () => (
  useDevTools ? window.devToolsExtension() : f => f
);

export default createStore(
  finalReducer,
  initialState,
  compose(
    applyMiddleware(logger),
    addDevTools()
  )
);
