import * as Redux from "redux";
import reducer from "./reducer";
import actions from "./actions";
import { undoable } from "./undo";
import { updateHash, getElementsFromHash } from "./persist";

const initialState = {
  lastPosition: null,
  selectedIndex: null,
  showMenu: true,
  dragging: false,
  elements: getElementsFromHash(),
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

const makeLogger = reducer => {
  return (state, action) => {
    console.group(action.type);
    console.log(state);
    console.log(action);
    const newState = reducer(state, action);
    console.log(newState);
    console.groupEnd();

    return newState;
  };
};

export default Redux.createStore(
  undoable(makeLogger(reducer), {
    filter: filterUndo,
    onUpdate: (state) => updateHash(state.elements),
    merge: mergeUndoStates,
  }),
  {
    past: [],
    present: initialState,
    future: []
  }
);
