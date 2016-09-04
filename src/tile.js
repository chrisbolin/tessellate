import React from "react";

import Element from "./element";

export default class Tile extends React.Component {
  makeElements() {
    const { elements, onMouseDown, selectedIndex, forceElementUpdate } = this.props;
    return elements.map((element, index) => (
      <Element
        element={element}
        key={index}
        update={index === selectedIndex || !!forceElementUpdate}
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
