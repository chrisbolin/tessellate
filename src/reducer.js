import { getStateFromHash } from "./persist";
import actions from "./actions";

const editElement = (state, editor) => {
  const elements = [...state.elements]; // copy
  const element = {...elements[state.selectedIndex]}; // copy

  elements[state.selectedIndex] = editor(element);

  return elements;
};

const performMove = (state, dx, dy) => {
  return editElement(state, element => {
    const [x0, y0] = element.translate;

    element.translate = [
      (x0 + dx),
      (y0 + dy)
    ];

    return element;
  });
};

const performDrag = (state, action) => {
  // calculate dx, dy
  const start = state.lastPosition;
  const stop = action.position;

  const factor = 100 / Math.max(window.innerWidth, window.innerHeight);
  const dx = (stop.x - start.x) * factor;
  const dy = (stop.y - start.y) * factor;

  return performMove(state, dx, dy);
};

const defaultElement =   {
  type: "rect",
  width: 4,
  height: 4,
  fill: "#000000",
  translate: [0, 0],
  rotate: 0,
};

export default (state, action) => {
  let elements;
  switch (action.type) {
    case actions.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };

    case actions.CLEAR_ARTBOARD:
      return { ...state, elements: [] };

    case actions.ADD_ELEMENT:
      const newElement = {
        ...(state.elements[state.selectedIndex] || defaultElement)
      };

      return {
        ...state,
        selectedIndex: state.elements.length, // will be new index
        elements: [
          ...state.elements,
          newElement
        ],
      };

    case actions.DELETE_ELEMENT:
      elements = [ ...state.elements ];
      elements.splice(state.selectedIndex, 1);

      return {
        ...state,
        elements,
        selectedIndex: 0
      };

    case actions.REORDER_ELEMENT:
      const selectedIndex = state.selectedIndex + action.direction;

      if (selectedIndex <= -1 || selectedIndex >= state.elements.length) {
        return state; // out of bounds
      }

      if (action.direction === 1) { // swap w/ higher index
        elements = [
          ...state.elements.slice(0, state.selectedIndex),
          state.elements[state.selectedIndex + 1],
          state.elements[state.selectedIndex],
          ...state.elements.slice(state.selectedIndex + 2, state.elements.length)
        ];
      } else if (action.direction === -1) { // swap w/ lower index
        elements = [
          ...state.elements.slice(0, state.selectedIndex - 1),
          state.elements[state.selectedIndex],
          state.elements[state.selectedIndex - 1],
          ...state.elements.slice(state.selectedIndex + 1, state.elements.length)
        ];
      }

      return {
        ...state,
        elements,
        selectedIndex,
      };

    case actions.EDIT_ELEMENT:
      elements = editElement(state, element => {
        return {
          ...element,
          ...action.edit
        }
      });
      return { ...state, elements }

    case actions.START_DRAG:
      return {
        ...state,
        selectedIndex: action.elementId,
        lastPosition: action.position,
        dragging: true,
      };

    case actions.EDIT_BACKGROUND:
      return {
        ...state,
        backgroundColor: action.backgroundColor
      }

    case actions.SELECT_ELEMENT:
      return {
        ...state,
        selectedIndex: action.elementId,
      };

    case actions.DRAG_ELEMENT:
      return {
        ...state,
        elements: performDrag(state, action),
        lastPosition: action.position,
      };

    case actions.NUDGE_ELEMENT:
      const {dx, dy, size} = action;
      let factor;

      if (size === "small") {
        factor = 0.05;
      } else if (size === "medium") {
        factor = 1;
      } else if (size === "large") {
        factor = 5;
      }

      return {
        ...state,
        elements: performMove(state, dx * factor, dy * factor),
      };

    case actions.END_SELECT:
      return {
        ...state,
        dragging: false,
        elements: performDrag(state, action),
      };

    case actions.DESELECT:
      return {
        ...state,
        dragging: false,
        selectedIndex: null,
      };

    case actions.LOCATION_CHANGE:
      return {
        ...state,
        ...getStateFromHash(action.href)
      };

    default:
      return state;
  }
};
