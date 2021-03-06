import React from "react";

import ElementMenuItem from "./element-menu-item";
import Links from "./links";
import Signature from "./signature";

export default class Menu extends React.Component {
  renderAbout() {
    return (
      <div className="about">
        <h1>
          <a href="#">Tessellate</a>
        </h1>
        <p>
          Tessellate is interactive art that explores repetition.
          Drag, re-size, rotate, remove, color, and re-order the shapes.
          Create and remove them. Share a link to your work,
          like <Links/>.
        </p>
        <p>
          <b>n</b> makes a new
          element; <b>delete</b> removes an
          element; <b>escape</b> shows and hides this menu.
          If an element is selected, all new elements are duplicates of it.
        </p>
        <p>
          This works best on OS X Chrome.
          If you{`'`}re
          curious about the implementation, <a href="https://github.com/chrisbolin/tessellate" target="_blank">
            check out the source
          </a>.
        </p>
        <p>
          <Signature/>
        </p>
      </div>
    );
  }
  renderBackgroundOptions() {
    return (
      <div className="list-item element background">
        <div className="group">Background</div>
        <div className="group">
          <input
            title="background color"
            type="color"
            value={this.props.backgroundColor}
            onChange={(event) => this.props.editBackground(event.target.value)}
          />
        </div>
      </div>
    );
  }
  renderElements() {
    return (
      <div className="main">
        {this.renderAbout()}
        {
          this.props.elements.map((element, index) => (
            <ElementMenuItem
              element={element}
              key={index}
              index={index}
              selected={index === this.props.selectedIndex}
              selectElement={this.props.selectElement}
              editor={this.props.editSelectedElement}
              deleteElement={this.props.deleteElement}
              moveUp={this.props.moveUp}
              moveDown={this.props.moveDown}
            />
          )).reverse() // show last rendered on top, for z-indexing
        }
        {this.renderBackgroundOptions()}
      </div>
    );
  }
  renderActions() {
    return (
      <div className="actions">
        <div title="add element" className="button" onClick={this.props.addElement}> + </div>
        <div title="clear all elements" className="button" onClick={this.props.clearArtboard}> ✷ </div>
        <div
          title="undo"
          className={`button ${!this.props.canUndo ? "disabled" : ""}`}
          onClick={this.props.undo}
        >
          ↰
        </div>
        <div
          title="redo"
          className={`button ${!this.props.canRedo ? "disabled" : ""}`}
          onClick={this.props.redo}
        >
          ↱
        </div>
        <div className="toggle-hint">
          show + hide menu with <b>escape</b>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps) {
    return !nextProps.skipMenuUpdate;
  }
  render() {
    return (
      <div className={`menu ${!this.props.showMenu ? "hidden" : ""}`}>
        {this.renderElements()}
        {this.renderActions()}
      </div>
    );
  }
}
