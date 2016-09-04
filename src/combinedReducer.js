import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducer";
import { undoable } from "./undo";
import { updateHash, getStateFromHash } from "./persist";
import actions, {
  undoableActions, forceElementUpdateActions, skipMenuUpdateActions
} from "./actions";

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

// UNDO //

const filterUndo = (action) => {
  return undoableActions.indexOf(action.type) !== -1;
};

const mergeUndoStates = (currentState, undoState) => {
  return {
    ...currentState,
    elements: undoState.elements,
    backgroundColor: undoState.backgroundColor
  };
};

const undoableReducer = undoable(reducer, {
  filter: filterUndo,
  merge: mergeUndoStates,
});

// PERFORMANCE REDUCER //

const performanceReducer = (reducer) => {
  return (state, action) => {
    return {
      ...reducer(state, action),
      performance: {
        forceElementUpdate: (forceElementUpdateActions.indexOf(action.type) !== -1),
        skipMenuUpdate: (skipMenuUpdateActions.indexOf(action.type) !== -1)
      }
    };
  };
};

export default performanceReducer(undoableReducer);
