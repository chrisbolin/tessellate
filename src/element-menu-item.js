import React from "react";

import Select from "./select";

const typeDisplayNames = {
  rect: "▭",
  ellipse: "◯",
};

export default class ElementMenuItem extends React.Component {
  selectThisElement() {
    this.props.selectElement(this.props.index);
  }

  handleTypeChange(type) {
    this.props.editor({type});
  }

  handleRotationChange(event) {
    this.props.editor({rotate: event.target.value});
  }

  handleColorChange(event) {
    this.props.editor({fill: event.target.value});
  }

  handleHeightChange(event) {
    this.props.editor({height: event.target.value});
  }

  handleWidthChange(event) {
    this.props.editor({width: event.target.value});
  }

  render() {
    const { element, selected } = this.props;
    return (
      <div
        className={`list-item element ${selected ? "selected" : ""}`}
        onMouseDown={this.selectThisElement.bind(this)}
      >
      <div className="group">
          <Select
            value={element.type}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleTypeChange.bind(this)}
            displayValues={typeDisplayNames}
          />
        </div>
        <div className="group">
          <input
            type="color"
            value={element.fill}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleColorChange.bind(this)}
          />
        </div>
        <div className="group">
          <input
            type="number"
            value={element.height}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleHeightChange.bind(this)}
          />
          ⨯
          <input
            type="number"
            value={element.width}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleWidthChange.bind(this)}
          />
        </div>
        <div className="group">
          <input
            type="number"
            value={element.rotate}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleRotationChange.bind(this)}
          />
          °
        </div>
        <div className="group">
          <div
            className="button"
            onClick={this.props.moveUp}
          >
            △
          </div>
          <div
            className="button"
            onClick={this.props.moveDown}
            style={{paddingTop: 6}}
          >
            ▽
          </div>
          <div
            className="button"
            onClick={this.props.deleteElement}
          >
            ✗
          </div>
        </div>
      </div>
    );
  }
}
