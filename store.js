import * as Redux from "redux";
import reducer from "./reducer";
import actions from "./actions";
import { undoable } from "./undo";
import { updateHash, getElementsFromHash } from "./persist";

const defaultElements = [
  {
    "type": "rect",
    "width": "2",
    "height": "17",
    "fill": "#ffc0cb",
    "translate": [
      2.855,
      -1.88
    ],
    "rotate": "-58"
  },
  {
    "type": "rect",
    "width": "2",
    "height": "19",
    "fill": "#a4b3ff",
    "translate": [
      7.083,
      3.601
    ],
    "rotate": "-56"
  },
  {
    "type": "rect",
    "width": "2",
    "height": "17",
    "fill": "#c8fbc3",
    "translate": [
      8.285,
      -1.044
    ],
    "rotate": "-64"
  },
  {
    "type": "rect",
    "width": "2",
    "height": "18",
    "fill": "#fbc8fe",
    "translate": [
      16.376,
      7.38
    ],
    "rotate": "-66"
  }
];


const getInitialElements = () => {
  return getElementsFromHash() || defaultElements;
}

const initialState = {
  lastPosition: null,
  selectedIndex: null,
  showMenu: true,
  dragging: false,
  elements: getInitialElements(),
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
