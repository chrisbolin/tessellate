import store from "./store";

const copyElements = () => {
  const elements = store.getState().present.elements;
  copy({
    elements,
    hash: location.hash
  });
  console.info('Elements copied to clipboard ✂️');
  return true;
};

export default () => {
  window.Tessellate = {
    copyElements
  };
};
