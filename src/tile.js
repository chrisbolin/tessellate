import React from "react";

import Element from "./element";

export default class Tile extends React.Component {
  makeElements() {
    const { elements, onMouseDown } = this.props;
    return elements.map((element, index) => (
      <Element
        element={element}
        key={index}
        onMouseDown={(event) => onMouseDown(event, index)}
      />
    ));
  }

  render () {
    const {index, base} = this.props;
    const row = Math.floor(index / base);
    const column = (index % base);
    const transform =
      `translate(${row * base},${column * base})`
    ;
    return (
      <g transform={transform}>
        {this.makeElements()}
      </g>
    );
  }
}
