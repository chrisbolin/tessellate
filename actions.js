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
  "UNDO",
  "REDO",
];

// create an object with identical keys/values
// { "INIT": "INIT", ...}
export default names.reduce((actions, name) => {
  actions[name] = name
  return actions;
}, {});
