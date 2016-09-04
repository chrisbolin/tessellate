const names = [
  "TOGGLE_MENU",
  "START_DRAG",
  "END_SELECT",
  "DESELECT",
  "DRAG_ELEMENT",
  "NUDGE_ELEMENT",
  "SELECT_ELEMENT",
  "DELETE_ELEMENT",
  "EDIT_ELEMENT",
  "ADD_ELEMENT",
  "REORDER_ELEMENT",
  "LOCATION_CHANGE",
  "EDIT_BACKGROUND",
  "UNDO",
  "REDO",
];

// create an object with identical keys/values
// { "INIT": "INIT", ...}
const actions = names.reduce((actions, name) => {
  actions[name] = name
  return actions;
}, {});

export default actions;

export const undoableActions = [
  actions.EDIT_ELEMENT,
  actions.ADD_ELEMENT,
  actions.DELETE_ELEMENT,
  actions.NUDGE_ELEMENT,
  actions.REORDER_ELEMENT,
  actions.START_DRAG,
  actions.EDIT_BACKGROUND
];

export const forceElementUpdateActions = [
  actions.LOCATION_CHANGE,
  actions.REORDER_ELEMENT,
  actions.UNDO,
  actions.REDO,
];

export const persistedActions = [
  ...undoableActions,
  actions.END_SELECT,
  actions.UNDO,
  actions.REDO
];
