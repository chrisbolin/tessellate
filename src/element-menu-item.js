import React from "react";

import Select from "./select";

const typeDisplayNames = {
  rect: "▭",
  ellipse: "◯",
  triangle: "△",
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

  componentDidUpdate(prevProps) {
    if (!prevProps.selected && this.props.selected) {
      if (this.element.scrollIntoViewIfNeeded) {
        this.element.scrollIntoViewIfNeeded(); // unsupported in firefox and IE
      }
    }
  }

  render() {
    const { element, selected } = this.props;
    return (
      <div
        className={`list-item element ${selected ? "selected" : ""}`}
        onMouseDown={this.selectThisElement.bind(this)}
        ref={ (element) => this.element = element }
      >
      <div className="group">
          <Select
            title="shape"
            value={element.type}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleTypeChange.bind(this)}
            displayValues={typeDisplayNames}
          />
        </div>
        <div className="group">
          <input
            title="color"
            type="color"
            value={element.fill}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleColorChange.bind(this)}
          />
        </div>
        <div className="group">
          <input
            title="height"
            type="number"
            value={element.height}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleHeightChange.bind(this)}
          />
          ⨯
          <input
            title="width"
            type="number"
            value={element.width}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleWidthChange.bind(this)}
          />
        </div>
        <div className="group">
          <input
            title="rotation"
            type="number"
            value={element.rotate}
            onFocus={this.selectThisElement.bind(this)}
            onChange={this.handleRotationChange.bind(this)}
          />
          °
        </div>
        <div className="group">
          <div
            title="move element up"
            className="button"
            onClick={this.props.moveUp}
          >
            △
          </div>
          <div
            title="move element down"
            className="button"
            onClick={this.props.moveDown}
            style={{paddingTop: 6}}
          >
            ▽
          </div>
          <div
            title="delete element"
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
