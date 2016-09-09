import store from "./store";

export const copyElements = () => {
  const elements = store.getState().present.elements;
  copy({
    elements,
    hash: location.hash
  });
  console.info('Elements copied to clipboard ✂️');
  return true;
};

export const animate = () => {
  const backward = !!store.getState().past.length;
  const animationInterval = setInterval(() => {
    if (backward && store.getState().past.length) {
      store.dispatch({ type: "UNDO" });
    } else if (!backward && store.getState().future.length) {
      store.dispatch({ type: "REDO" });
    } else {
      clearInterval(animationInterval);
    }
  }, 30);
};
