export function undoable(reducer, options) {
  // options: { merge, filter }
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  };

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state;
    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)

        if (previous) {
          return {
            past: newPast,
            present: options.merge(present, previous),
            future: [ present, ...future ]
          };
        } else {
          return state;
        }

      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)

        if (next) {
          return {
            past: [ ...past, present ],
            present: options.merge(present, next),
            future: newFuture
          };
        } else {
          return state;
        }

      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);

        if (options.filter(action)) {
          return {
            past: [ ...past, present ],
            present: newPresent,
            future: []
          };
        } else {
          return {
            past,
            present: newPresent,
            future
          }
        }
    }
  }
}
