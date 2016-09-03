import React from "react";

const noop = () => {};

export default ({ element, onMouseDown=noop }) => {
  // note: order of transforms matters
  // -> if rotate is first, x-y moves will have to be altered
  const elementTransforms = {
    translate: element.translate,
    rotate: element.rotate,
  };

  let elementProps;

  const baseProps = {
    fill: element.fill,
  };

  if (element.type === "rect") {
    elementProps = {
      ...baseProps,
      width: element.width,
      height: element.height
    };
  } else if (element.type === "ellipse") {
    elementProps = {
      ...baseProps,
      rx: element.width / 2,
      ry: element.height / 2
    };
  }

  let transform = Object.keys(elementTransforms).map(key => (
    `${key}(${elementTransforms[key]})`
  )).join(' ');

  return React.createElement(
    element.type,
    {
      transform,
      onMouseDown,
      ...elementProps
    }
  );
};
