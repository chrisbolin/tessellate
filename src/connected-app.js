import React from "react";
import * as ReactRedux from "react-redux";

import actions from "./actions";
import store from "./store";
import App from "./app";

// HELPERS //

const getPosition = (event) => {
  return {
    x: event.clientX,
    y: event.clientY
  };
};

// MAPPERS //

const mapStateToProps = state => ({
  ...state.present,
  ...state.performance,
  canUndo: !!state.past.length,
  canRedo: !!state.future.length
});

const mapDispatchToProps = dispatch => ({
  undo() {
    dispatch({ type: actions.UNDO });
  },
  redo() {
    dispatch({ type: actions.REDO });
  },
  toggleMenu() {
    dispatch({ type: actions.TOGGLE_MENU });
  },
  deselect() {
    dispatch({ type: actions.DESELECT });
  },
  startDrag(elementId, event) {
    dispatch({
      type: actions.START_DRAG,
      elementId,
      position: getPosition(event)
    });
  },
  selectElement(elementId) {
    dispatch({
      type: actions.SELECT_ELEMENT,
      elementId,
    });
  },
  deleteElement() {
    dispatch({
      type: actions.DELETE_ELEMENT,
    });
  },
  moveUp(direction) {
    dispatch({
      type: actions.REORDER_ELEMENT,
      direction: 1
    });
  },
  moveDown(direction) {
    dispatch({
      type: actions.REORDER_ELEMENT,
      direction: -1
    });
  },
  endSelect(event) {
    const state = store.getState().present;
    if (state.selectedIndex !== null) {
      dispatch({
        type: actions.END_SELECT,
        position: getPosition(event)
      });
    }
  },
  moveMouse(event) {
    const state = store.getState().present;
    if (state.dragging) {
      dispatch({
        type: actions.DRAG_ELEMENT,
        position: getPosition(event)
      });
    }
  },
  nudgeElement(dx, dy, size) {
    dispatch({
      type: actions.NUDGE_ELEMENT,
      dx,
      dy,
      size
    });
  },
  editBackground(backgroundColor) {
    dispatch({
      type: actions.EDIT_BACKGROUND,
      backgroundColor
    });
  },
  editSelectedElement(edit) {
    dispatch({
      type: actions.EDIT_ELEMENT,
      edit
    });
  },
  addElement() {
    dispatch({ type: actions.ADD_ELEMENT })
  }
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
